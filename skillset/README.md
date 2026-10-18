# Skillset

A React Native (Expo) app for tracking your software engineering skills, your level, and which specializations you match best.

- **Roles**: your best-matching specializations (Frontend, Backend, DevOps, ML, Security, …), ranked by a weighted match score, with the next skills to learn. Set one as your goal.
- **Skills**: add skills by search or by area and rate each 1–5 (Aware → Expert).
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

Add a row to `ROLE_DEFS` in `src/data/catalog.js`. Requirements are `skill:level`; `a|b:3` means any one of `a` or `b` at level 3. Core requirements count 3×, supporting ones 1×.
