# Skillset

A React Native (Expo) app for tracking your software engineering skills, your level, and which specializations you match best.

- **Roles**: 23 specializations based on the role roadmaps at [roadmap.sh](https://roadmap.sh) (Frontend, Backend, DevOps, AI Engineer, Data Analyst, Cyber Security, …), ranked by a weighted match score. Each role shows its core skills as numbered roadmap steps, with a note on what that skill means for the role, and links to the full roadmap. Set one as your goal.
- **Skills**: add skills by search or by area and rate each 1–5 (Aware → Expert). Tap a skill to see what it is, which roles use it as a core step, and its roadmap.sh page.
- **Plan**: to-do steps, added from a role's skill gaps or written yourself. Checking off a skill step raises that skill.
- **Learned**: a dated log of what you learn, optionally tied to a skill.
- **Level**: XP from skill levels, logged learnings and finished steps.

Data is stored on the device with AsyncStorage.

## Run it

```bash
cd skillset
npm install
npx expo start        # scan the QR code with Expo Go on your phone
npm test              # matching / XP engine tests
```

## Layout

```
src/app/            screens (Expo Router): tabs + role/[id] modal
src/components/     UI building blocks (BigButton, LevelPips, RoleCard, …)
src/data/catalog.js skills and specializations — edit here to add roles
src/lib/engine.js   matching, gaps and XP math
src/state/          app state + persistence
src/theme.js        dark palette with the green accent
```

### Adding a specialization

Add an entry to `ROLE_DEFS` in `src/data/catalog.js` with its roadmap.sh `slug`. `core` lists `[skills, level, note]` in roadmap order, where `a|b` means any one of `a` or `b` and `note` says what the skill means for this role. `plus` lists supporting skills as `skill:level`. Core counts 3×, supporting 1×.
