import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LEVELS, ROLE_BY_ID, SAMPLE_SKILLS, SKILLS } from '../data/catalog.js';
import { skillName } from '../lib/engine.js';

const STORAGE_KEY = 'skillset.v1';
const MAX_LOG = 1500;

const blank = () => ({ skills: {}, custom: {}, plan: [], log: [], goal: null });

const newId = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

function normalize(raw) {
  if (!raw || typeof raw !== 'object') return blank();
  return {
    skills: raw.skills && typeof raw.skills === 'object' ? { ...raw.skills } : {},
    custom: raw.custom && typeof raw.custom === 'object' ? { ...raw.custom } : {},
    plan: Array.isArray(raw.plan) ? raw.plan : [],
    log: Array.isArray(raw.log) ? raw.log : [],
    goal: typeof raw.goal === 'string' && ROLE_BY_ID[raw.goal] ? raw.goal : null,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return normalize(action.state);
    case 'setLevel': {
      const skills = { ...state.skills };
      if (action.level <= 0) delete skills[action.id];
      else skills[action.id] = action.level;
      return { ...state, skills };
    }
    case 'addCustom':
      return {
        ...state,
        custom: { ...state.custom, [action.id]: { name: action.name } },
        skills: { ...state.skills, [action.id]: 2 },
      };
    case 'addSteps': {
      const existing = new Set(state.plan.filter((p) => !p.done).map((p) => p.text));
      const fresh = action.steps
        .filter((s) => !existing.has(s.text))
        .map((s) => ({ id: newId(), done: false, t: Date.now(), ...s }));
      return { ...state, plan: [...fresh, ...state.plan] };
    }
    case 'toggleStep': {
      let skills = state.skills;
      const plan = state.plan.map((p) => {
        if (p.id !== action.id) return p;
        const done = !p.done;
        if (done && p.skill && p.lvl && (skills[p.skill] || 0) < p.lvl) skills = { ...skills, [p.skill]: p.lvl };
        return { ...p, done };
      });
      return { ...state, plan, skills };
    }
    case 'deleteStep':
      return { ...state, plan: state.plan.filter((p) => p.id !== action.id) };
    case 'addLog':
      return {
        ...state,
        log: [{ id: newId(), text: action.text, skill: action.skill || null, t: Date.now() }, ...state.log].slice(0, MAX_LOG),
      };
    case 'deleteLog':
      return { ...state, log: state.log.filter((l) => l.id !== action.id) };
    case 'setGoal':
      return { ...state, goal: action.id };
    case 'loadSample':
      return { ...state, skills: { ...SAMPLE_SKILLS } };
    case 'reset':
      return blank();
    default:
      return state;
  }
}

const SkillsetContext = createContext(null);

export function SkillsetProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, blank);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState(null);
  const stateRef = useRef(state);
  const toastTimer = useRef(null);
  stateRef.current = state;

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => { if (raw) dispatch({ type: 'hydrate', state: JSON.parse(raw) }); })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ready) return undefined;
    const t = setTimeout(() => { AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {}); }, 250);
    return () => clearTimeout(t);
  }, [state, ready]);

  const notify = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const actions = useMemo(() => ({
    setLevel: (id, level) => dispatch({ type: 'setLevel', id, level }),
    addSkill: (id) => {
      if (stateRef.current.skills[id]) return;
      dispatch({ type: 'setLevel', id, level: 2 });
      notify(`Added ${skillName(stateRef.current, id)}`);
    },
    removeSkill: (id) => {
      notify(`Removed ${skillName(stateRef.current, id)}`);
      dispatch({ type: 'setLevel', id, level: 0 });
    },
    addCustomSkill: (rawName) => {
      const name = rawName.trim().slice(0, 60);
      if (!name) return;
      const lower = name.toLowerCase();
      const s = stateRef.current;
      const known = Object.keys(SKILLS).find((k) => SKILLS[k][0].toLowerCase() === lower)
        || Object.keys(s.custom).find((k) => s.custom[k].name.toLowerCase() === lower);
      if (known) {
        if (!s.skills[known]) dispatch({ type: 'setLevel', id: known, level: 2 });
        notify(`Added ${skillName(s, known)}`);
        return;
      }
      dispatch({ type: 'addCustom', id: `c_${newId()}`, name });
      notify(`Added ${name}`);
    },
    addSteps: (steps, message) => { dispatch({ type: 'addSteps', steps }); notify(message || 'Added to plan'); },
    addStep: (text) => { if (text.trim()) { dispatch({ type: 'addSteps', steps: [{ text: text.trim().slice(0, 140) }] }); notify('Added to plan'); } },
    toggleStep: (id) => {
      const s = stateRef.current;
      const step = s.plan.find((p) => p.id === id);
      if (!step) return;
      dispatch({ type: 'toggleStep', id });
      if (!step.done) {
        const raises = step.skill && step.lvl && (s.skills[step.skill] || 0) < step.lvl;
        notify(raises ? `${skillName(s, step.skill)} is now ${LEVELS[step.lvl]}` : 'Done · +10 XP');
      }
    },
    deleteStep: (id) => dispatch({ type: 'deleteStep', id }),
    addLog: (text, skill) => { if (text.trim()) { dispatch({ type: 'addLog', text: text.trim().slice(0, 200), skill }); notify('Logged · +5 XP'); } },
    deleteLog: (id) => dispatch({ type: 'deleteLog', id }),
    setGoal: (id) => { dispatch({ type: 'setGoal', id }); notify(id ? 'Goal set' : 'Goal removed'); },
    loadSample: () => { dispatch({ type: 'loadSample' }); notify('Example skills loaded'); },
    reset: () => { dispatch({ type: 'reset' }); notify('All data deleted'); },
  }), [notify]);

  const value = useMemo(() => ({ state, ready, toast, ...actions }), [state, ready, toast, actions]);
  return <SkillsetContext.Provider value={value}>{children}</SkillsetContext.Provider>;
}

export function useSkillset() {
  const ctx = useContext(SkillsetContext);
  if (!ctx) throw new Error('useSkillset must be used inside SkillsetProvider');
  return ctx;
}
