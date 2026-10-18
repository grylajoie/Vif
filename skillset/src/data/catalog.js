// Skill and specialization catalog. Pure data, shared by every screen.

export const LEVELS = ['', 'Aware', 'Beginner', 'Working', 'Strong', 'Expert'];

export const LEVEL_HINTS = [
  '',
  'Heard of it, read about it',
  'Followed tutorials, small projects',
  'Use it on real work without help',
  'Go-to person, handle hard cases',
  'Teach it, shape how others use it',
];

export const CATEGORIES = [
  'Languages', 'Frontend', 'Backend', 'Data', 'Cloud & Ops', 'Mobile',
  'Security', 'ML & AI', 'Systems', 'Practices', 'Other',
];

// id -> [display name, category]
export const SKILLS = {
  js: ['JavaScript', 'Languages'],
  ts: ['TypeScript', 'Languages'],
  python: ['Python', 'Languages'],
  java: ['Java', 'Languages'],
  go: ['Go', 'Languages'],
  rust: ['Rust', 'Languages'],
  cpp: ['C / C++', 'Languages'],
  csharp: ['C#', 'Languages'],
  kotlin: ['Kotlin', 'Languages'],
  swift: ['Swift', 'Languages'],
  sql: ['SQL', 'Languages'],
  bash: ['Shell scripting', 'Languages'],
  html_css: ['HTML & CSS', 'Frontend'],
  react: ['React', 'Frontend'],
  vue: ['Vue / Angular', 'Frontend'],
  state: ['State management', 'Frontend'],
  a11y: ['Accessibility', 'Frontend'],
  web_perf: ['Web performance', 'Frontend'],
  design_sys: ['Design systems', 'Frontend'],
  rest: ['REST API design', 'Backend'],
  graphql: ['GraphQL', 'Backend'],
  node: ['Node.js', 'Backend'],
  auth: ['Auth & OAuth', 'Backend'],
  queues: ['Message queues', 'Backend'],
  caching: ['Caching', 'Backend'],
  microservices: ['Microservices', 'Backend'],
  postgres: ['Relational databases', 'Data'],
  nosql: ['NoSQL databases', 'Data'],
  data_model: ['Data modeling', 'Data'],
  etl: ['ETL pipelines', 'Data'],
  spark: ['Spark / big data', 'Data'],
  warehouse: ['Data warehousing', 'Data'],
  stats: ['Statistics', 'Data'],
  linux: ['Linux', 'Cloud & Ops'],
  docker: ['Docker', 'Cloud & Ops'],
  k8s: ['Kubernetes', 'Cloud & Ops'],
  aws: ['Cloud (AWS / GCP / Azure)', 'Cloud & Ops'],
  iac: ['Infrastructure as code', 'Cloud & Ops'],
  cicd: ['CI/CD', 'Cloud & Ops'],
  observability: ['Monitoring & observability', 'Cloud & Ops'],
  networking: ['Networking', 'Cloud & Ops'],
  ios: ['iOS development', 'Mobile'],
  android: ['Android development', 'Mobile'],
  cross_mobile: ['React Native / Flutter', 'Mobile'],
  appsec: ['Application security', 'Security'],
  crypto: ['Cryptography basics', 'Security'],
  threat: ['Threat modeling', 'Security'],
  pentest: ['Penetration testing', 'Security'],
  ml: ['Machine learning', 'ML & AI'],
  dl: ['Deep learning', 'ML & AI'],
  llm: ['LLM apps & prompting', 'ML & AI'],
  mlops: ['MLOps', 'ML & AI'],
  os: ['Operating systems', 'Systems'],
  concurrency: ['Concurrency', 'Systems'],
  distributed: ['Distributed systems', 'Systems'],
  embedded: ['Embedded systems', 'Systems'],
  perf: ['Performance profiling', 'Systems'],
  game_engine: ['Game engines (Unity / Unreal)', 'Systems'],
  graphics: ['3D graphics', 'Systems'],
  git: ['Git', 'Practices'],
  testing: ['Automated testing', 'Practices'],
  dsa: ['Data structures & algorithms', 'Practices'],
  sysdesign: ['System design', 'Practices'],
  code_review: ['Code review', 'Practices'],
  arch: ['Software architecture', 'Practices'],
  mentoring: ['Mentoring', 'Practices'],
  product: ['Product sense', 'Practices'],
  tech_writing: ['Technical writing', 'Practices'],
};

// [id, name, track, blurb, core requirements, supporting requirements]
// "a|b:3" means any one of a or b at level 3. Core counts 3x, supporting 1x.
const ROLE_DEFS = [
  ['frontend', 'Frontend Engineer', 'Product', 'Builds the interfaces people touch: fast, accessible, well-structured UIs.', 'js:4 ts:3 html_css:4 react|vue:3 a11y:3 web_perf:3', 'state:3 testing:3 design_sys:2 git:3'],
  ['backend', 'Backend Engineer', 'Product', 'Designs the APIs, data and services behind an app.', 'python|java|go|node|csharp|kotlin:4 rest:4 sql:3 postgres:3 auth:3 caching:3', 'testing:3 queues:2 docker:2 observability:2 sysdesign:2'],
  ['fullstack', 'Full-Stack Engineer', 'Product', 'Ships features end to end, from the database to the UI.', 'js|ts:3 react|vue:3 node|python|java|go:3 rest:3 sql:3 html_css:3', 'docker:2 git:3 testing:2 auth:2 aws:2'],
  ['mobile', 'Mobile Engineer', 'Product', 'Builds native or cross-platform apps for phones.', 'ios|android|cross_mobile:4 swift|kotlin|ts:3 rest:3 state:3', 'testing:2 a11y:2 perf:2 git:3'],
  ['ai_app', 'AI Application Engineer', 'Data & AI', 'Builds products on LLMs: prompting, retrieval, evals and tool use.', 'llm:4 python|ts:4 rest:3 testing:2', 'ml:2 nosql:2 react:2 product:3 tech_writing:2'],
  ['ml_eng', 'Machine Learning Engineer', 'Data & AI', 'Trains, ships and maintains models in production.', 'python:4 ml:4 dl:3 mlops:3 stats:3', 'docker:2 aws:2 dsa:3 sql:2 spark:2'],
  ['data_sci', 'Data Scientist', 'Data & AI', 'Turns data into answers with statistics and models.', 'python:4 stats:4 ml:3 sql:3', 'data_model:2 dl:2 tech_writing:2 product:3'],
  ['data_eng', 'Data Engineer', 'Data & AI', 'Builds the pipelines and warehouses that move and shape data.', 'python:4 sql:4 etl:4 data_model:3 warehouse:3', 'spark:3 postgres:3 nosql:2 aws:2 cicd:2'],
  ['devops', 'DevOps / Platform Engineer', 'Infrastructure', 'Builds the paved road: pipelines, environments and internal platforms.', 'linux:4 docker:4 k8s:3 cicd:4 iac:3 aws:3', 'bash:3 observability:3 networking:3 python|go:2'],
  ['sre', 'Site Reliability Engineer', 'Infrastructure', 'Keeps production fast and up, with automation instead of heroics.', 'linux:4 observability:4 distributed:3 networking:3 k8s:3 python|go:3', 'bash:3 perf:3 sysdesign:3 os:3 iac:2'],
  ['cloud', 'Cloud Engineer', 'Infrastructure', 'Designs and runs systems on a cloud provider.', 'aws:4 iac:4 networking:3 linux:3 docker:3', 'k8s:3 cicd:3 appsec:2 python|go|bash:2'],
  ['security', 'Security Engineer', 'Security', "Builds defenses into systems and into the team's habits.", 'appsec:4 threat:3 crypto:3 auth:3 networking:3 python|go:3', 'linux:3 pentest:2 code_review:3'],
  ['pentest', 'Penetration Tester', 'Security', 'Finds weaknesses by attacking systems, with permission.', 'pentest:4 networking:4 linux:4 appsec:3 python|bash:3', 'crypto:2 os:2 tech_writing:3'],
  ['systems', 'Systems Engineer', 'Specialist', 'Works close to the metal: runtimes, databases, OS-level code.', 'cpp|rust|go:4 os:4 concurrency:4 perf:4 distributed:3', 'dsa:4 networking:3 linux:3'],
  ['embedded', 'Embedded / Firmware Engineer', 'Specialist', 'Writes the software that runs on devices and hardware.', 'cpp:4 embedded:4 os:3 concurrency:3', 'rust:2 perf:3 networking:2 git:3'],
  ['gamedev', 'Game Developer', 'Specialist', 'Builds games: engines, gameplay, graphics and frame-time performance.', 'game_engine:4 cpp|csharp:4 graphics:3 dsa:3 perf:3', 'concurrency:2 git:3'],
  ['sdet', 'Test Automation Engineer', 'Quality', 'Builds the tests and tooling that keep releases safe.', 'testing:4 js|ts|python|java:3 cicd:3', 'git:3 rest:2 web_perf:2 code_review:3'],
  ['techlead', 'Tech Lead', 'Leadership', "Guides a team's technical direction while still shipping.", 'sysdesign:4 code_review:4 mentoring:4 arch:3 tech_writing:3', 'product:3 testing:3 js|ts|python|java|go|csharp:4'],
  ['architect', 'Software Architect', 'Leadership', 'Shapes how large systems fit together over years.', 'arch:5 sysdesign:5 distributed:4 microservices:4', 'aws:3 tech_writing:3 appsec:2 data_model:3'],
];

const parseReq = (spec, weight) =>
  spec.split(' ').map((token) => {
    const [ids, level] = token.split(':');
    return { ids: ids.split('|'), lvl: Number(level), w: weight };
  });

export const ROLES = ROLE_DEFS.map(([id, name, track, blurb, core, plus]) => ({
  id, name, track, blurb, req: [...parseReq(core, 3), ...parseReq(plus, 1)],
}));

export const ROLE_BY_ID = Object.fromEntries(ROLES.map((r) => [r.id, r]));

export const QUICK_PICKS = ['js', 'ts', 'python', 'java', 'sql', 'git', 'html_css', 'react', 'rest', 'linux', 'docker', 'testing', 'dsa', 'aws', 'go', 'node'];

export const SAMPLE_SKILLS = { js: 4, ts: 3, html_css: 4, react: 3, git: 3, rest: 2, sql: 2, node: 2, testing: 2, a11y: 1, docker: 1, dsa: 2 };

export const XP_PER_LEVEL = [0, 10, 25, 45, 70, 100];
export const XP_PER_LOG = 5;
export const XP_PER_STEP = 10;

export const TITLES = ['', 'Novice', 'Apprentice', 'Builder', 'Practitioner', 'Craftsperson', 'Specialist', 'Expert', 'Master', 'Virtuoso', 'Legend'];
