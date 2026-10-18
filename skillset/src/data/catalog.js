// Skill and specialization catalog. Pure data, shared by every screen.
// Roles follow the role-based roadmaps on roadmap.sh; core skills are listed
// in roadmap order, so "what to do next" walks the roadmap step by step.

export const ROADMAP_BASE = 'https://roadmap.sh/';

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
  'Languages', 'Web', 'Backend', 'Data', 'Cloud & Ops', 'Mobile',
  'Security', 'ML & AI', 'Systems', 'Practices', 'People', 'Other',
];

// id -> [display name, category, short description, roadmap.sh skill slug or null]
const SKILL_DEFS = {
  // Languages
  js: ['JavaScript', 'Languages', 'The language of the web. Runs in browsers and, with Node.js, on servers.', 'javascript'],
  ts: ['TypeScript', 'Languages', 'JavaScript with types. Catches bugs before they ship and makes refactors safe.', 'typescript'],
  python: ['Python', 'Languages', 'Readable, general-purpose. The default for data, AI, scripting and many backends.', 'python'],
  java: ['Java', 'Languages', 'Statically typed JVM language. Common in enterprise backends and Android.', 'java'],
  go: ['Go', 'Languages', 'Simple, fast, compiled. Popular for cloud services, CLIs and infrastructure tools.', 'golang'],
  rust: ['Rust', 'Languages', 'Memory-safe systems language with no garbage collector.', 'rust'],
  cpp: ['C / C++', 'Languages', 'Low-level, high-performance code: game engines, systems and embedded.', 'cpp'],
  csharp: ['C#', 'Languages', '.NET language for backends, desktop apps and Unity games.', 'aspnet-core'],
  kotlin: ['Kotlin', 'Languages', 'Modern JVM language and the default for Android.', 'kotlin'],
  swift: ['Swift', 'Languages', "Apple's language for iOS and macOS apps.", 'swift-ui'],
  php: ['PHP', 'Languages', 'Server-side web language behind WordPress and Laravel.', 'php'],
  ruby: ['Ruby', 'Languages', 'Expressive language best known for Ruby on Rails.', null],
  sql: ['SQL', 'Languages', 'Query, join and aggregate data in relational databases.', 'sql'],
  bash: ['Shell scripting', 'Languages', 'Automate the terminal: pipes, scripts and scheduled jobs.', 'shell-bash'],
  // Web
  internet: ['Internet & HTTP', 'Web', 'How a request travels: DNS, HTTP/HTTPS, browsers and hosting.', null],
  html_css: ['HTML & CSS', 'Web', 'Structure and style pages: semantic HTML, Flexbox, Grid, responsive design.', null],
  react: ['React', 'Web', 'Component library for building UIs from small, reusable pieces.', 'react'],
  vue: ['Vue', 'Web', 'Progressive UI framework with single-file components.', 'vue'],
  angular: ['Angular', 'Web', 'Full frontend framework with TypeScript, dependency injection and RxJS.', 'angular'],
  ssr: ['SSR & meta-frameworks', 'Web', 'Server rendering and file-based routing with Next.js, Nuxt and similar.', 'nextjs'],
  state: ['State management', 'Web', 'How app data flows: stores, context, and caching server data.', null],
  a11y: ['Accessibility', 'Web', 'Apps that work for everyone, including keyboard and screen-reader users.', null],
  web_perf: ['Web performance', 'Web', 'Fast loads and smooth UIs: Core Web Vitals, bundle size, caching.', null],
  design_sys: ['Design systems', 'Web', 'Reusable components and tokens that keep a UI consistent.', 'design-system'],
  tooling: ['Build tooling', 'Web', 'npm, bundlers like Vite, linters and formatters.', null],
  // Backend
  rest: ['API design', 'Backend', 'Designing HTTP APIs: resources, status codes, pagination, versioning, docs.', 'api-design'],
  graphql: ['GraphQL', 'Backend', 'API query language where clients ask for exactly the data they need.', 'graphql'],
  node: ['Node.js', 'Backend', 'JavaScript on the server: APIs, tooling and real-time apps.', 'nodejs'],
  auth: ['Auth & OAuth', 'Backend', 'Sessions, JWT, OAuth/OIDC and storing passwords safely.', null],
  queues: ['Message queues', 'Backend', 'Async messaging between services with Kafka, RabbitMQ or SQS.', null],
  caching: ['Caching', 'Backend', 'Redis and HTTP caching to cut latency and database load.', 'redis'],
  microservices: ['Microservices', 'Backend', 'Splitting a system into services that deploy independently.', null],
  // Data
  postgres: ['Relational databases', 'Data', 'PostgreSQL or MySQL: schemas, indexes, transactions, constraints.', 'postgresql-dba'],
  nosql: ['NoSQL databases', 'Data', 'Document, key-value and wide-column stores like MongoDB and DynamoDB.', 'mongodb'],
  data_model: ['Data modeling', 'Data', 'Structuring data into tables, keys and relationships that stay correct.', null],
  etl: ['ETL & pipelines', 'Data', 'Moving and transforming data on a schedule or as a stream.', null],
  spark: ['Spark / big data', 'Data', 'Processing datasets too big for one machine.', null],
  warehouse: ['Data warehousing', 'Data', 'Analytics stores like Snowflake, BigQuery and Redshift.', null],
  stats: ['Statistics', 'Data', 'Distributions, sampling, hypothesis tests and experiment design.', null],
  math: ['Math for ML', 'Data', 'Linear algebra, calculus and probability behind models.', null],
  dataviz: ['Data visualization', 'Data', 'Turning numbers into clear, honest charts.', null],
  excel: ['Spreadsheets', 'Data', 'Excel or Google Sheets: formulas, pivot tables, lookups, cleaning.', null],
  bi_tools: ['BI tools', 'Data', 'Dashboards in Power BI, Tableau or Looker.', null],
  db_ops: ['Backups & replication', 'Data', 'Backups, point-in-time recovery, replication and failover.', null],
  // Cloud & Ops
  linux: ['Linux', 'Cloud & Ops', 'The OS of servers: shell, processes, permissions, services.', 'linux'],
  docker: ['Docker', 'Cloud & Ops', 'Package an app and its dependencies into a portable container.', 'docker'],
  k8s: ['Kubernetes', 'Cloud & Ops', 'Orchestrate containers: deploy, scale and self-heal workloads.', 'kubernetes'],
  aws: ['Cloud (AWS / GCP / Azure)', 'Cloud & Ops', 'Compute, storage, networking and IAM on a cloud provider.', 'aws'],
  iac: ['Infrastructure as code', 'Cloud & Ops', 'Define servers and cloud resources in code with Terraform.', 'terraform'],
  config_mgmt: ['Configuration management', 'Cloud & Ops', 'Ansible, Chef or Puppet to configure many servers the same way.', null],
  cicd: ['CI/CD', 'Cloud & Ops', 'Automatically build, test and deploy every change.', null],
  observability: ['Monitoring & observability', 'Cloud & Ops', 'Metrics, logs, traces and alerts that show what production is doing.', null],
  networking: ['Networking', 'Cloud & Ops', 'TCP/IP, DNS, TLS, load balancers and firewalls.', null],
  // Mobile
  ios: ['iOS development', 'Mobile', 'Building iPhone apps with SwiftUI and UIKit.', 'ios'],
  android: ['Android development', 'Mobile', 'Building Android apps with Jetpack Compose and the Android SDK.', 'android'],
  cross_mobile: ['React Native / Flutter', 'Mobile', 'One codebase for iOS and Android.', 'react-native'],
  // Security
  appsec: ['Application security', 'Security', 'Secure coding and the OWASP Top 10.', null],
  crypto: ['Cryptography basics', 'Security', 'Hashing, encryption, signatures and TLS.', null],
  threat: ['Threat modeling', 'Security', 'Working out what can go wrong before an attacker does.', null],
  pentest: ['Penetration testing', 'Security', 'Ethical hacking: probing systems for weaknesses, with permission.', null],
  incident: ['Incident response', 'Security', 'Detecting, containing and investigating attacks.', null],
  // ML & AI
  ml: ['Machine learning', 'ML & AI', 'Training models that learn patterns from data.', null],
  dl: ['Deep learning', 'ML & AI', 'Neural networks with PyTorch or TensorFlow.', null],
  llm: ['LLM APIs & prompting', 'ML & AI', 'Calling models, prompt design, structured output and tool use.', 'prompt-engineering'],
  rag: ['RAG & vector search', 'ML & AI', 'Embeddings and retrieval so models answer from your own data.', null],
  agents: ['AI agents', 'ML & AI', 'Models that plan and call tools across multiple steps.', 'ai-agents'],
  ai_evals: ['AI evals & safety', 'ML & AI', 'Measuring model quality and defending against prompt injection and misuse.', 'ai-red-teaming'],
  mlops: ['MLOps', 'ML & AI', 'Shipping models: experiment tracking, serving, monitoring.', null],
  // Systems
  os: ['Operating systems', 'Systems', 'Processes, memory, file systems and scheduling.', 'computer-science'],
  concurrency: ['Concurrency', 'Systems', 'Threads and async code without races or deadlocks.', null],
  distributed: ['Distributed systems', 'Systems', 'Many machines acting as one: consistency, partitions, consensus.', null],
  perf: ['Performance profiling', 'Systems', 'Measuring where time and memory go, then removing bottlenecks.', null],
  game_engine: ['Game engines', 'Systems', 'Unity, Unreal or Godot: scenes, physics, scripting.', null],
  graphics: ['3D graphics', 'Systems', 'Rendering pipelines, shaders and lighting.', null],
  web3: ['Blockchain fundamentals', 'Systems', 'Consensus, wallets, transactions and gas.', null],
  smart_contracts: ['Smart contracts', 'Systems', 'Programs that run on-chain, usually written in Solidity.', null],
  // Practices
  git: ['Git & GitHub', 'Practices', 'Track changes and collaborate with branches and pull requests.', 'git-github'],
  testing: ['Automated testing', 'Practices', 'Unit, integration and end-to-end tests that run on every change.', null],
  qa_basics: ['QA fundamentals', 'Practices', 'Test plans, test cases, bug reports and test strategy.', null],
  dsa: ['Data structures & algorithms', 'Practices', 'Arrays, trees, graphs, sorting and Big-O.', 'datastructures-and-algorithms'],
  sysdesign: ['System design', 'Practices', 'Designing systems that scale: load balancing, caching, sharding.', 'system-design'],
  code_review: ['Code review', 'Practices', 'Giving and receiving useful feedback on code.', 'code-review'],
  arch: ['Software architecture', 'Practices', 'Structuring software: patterns, layers and trade-offs.', null],
  tech_writing: ['Technical writing', 'Practices', 'Docs, guides and READMEs people can actually follow.', null],
  // People
  mentoring: ['Mentoring', 'People', 'Helping others grow through pairing, feedback and 1:1s.', null],
  people_mgmt: ['People management', 'People', 'Hiring, performance reviews and keeping a team healthy.', null],
  delivery: ['Project delivery', 'People', 'Planning, estimating and shipping on time.', null],
  product: ['Product sense', 'People', "Understanding users and what's worth building.", null],
  speaking: ['Speaking & community', 'People', 'Talks, workshops, streams and building a community.', null],
};

export const SKILLS = Object.fromEntries(
  Object.entries(SKILL_DEFS).map(([id, [name, cat, desc, slug]]) => [id, { name, cat, desc, slug }]),
);

// Each role mirrors a roadmap.sh role roadmap. `core` is in roadmap order:
// [skill ids ("a|b" = any one of), target level, what this skill means for this role].
// `plus` lists supporting skills as "id:level", counted at 1/3 the weight of core.
const ROLE_DEFS = [
  {
    id: 'frontend', name: 'Frontend Developer', track: 'Web', slug: 'frontend',
    blurb: 'Builds the interfaces people touch: fast, accessible, well-structured UIs.',
    core: [
      ['internet', 2, 'Know what happens between typing a URL and seeing a page: DNS, HTTP, browsers.'],
      ['html_css', 4, 'Semantic markup, accessible forms, Flexbox and Grid, layouts that work on every screen.'],
      ['js', 4, 'DOM, events, fetch, async/await and modules. Most of your day is spent here.'],
      ['git', 3, 'Branches, pull requests and resolving conflicts with your team.'],
      ['tooling', 3, 'npm, Vite, ESLint and Prettier: set up and debug a modern project.'],
      ['react|vue|angular', 3, 'Pick one framework and learn components, state, routing and data fetching.'],
      ['ts', 3, 'Type your components and API responses to catch bugs early.'],
      ['testing', 3, 'Component tests with Vitest or Jest, plus a few end-to-end tests with Playwright.'],
      ['a11y', 3, 'Keyboard navigation, ARIA where needed, color contrast, screen-reader checks.'],
      ['web_perf', 3, 'Core Web Vitals, code splitting and image optimization.'],
    ],
    plus: 'state:3 ssr:2 design_sys:2 appsec:2 rest:2',
  },
  {
    id: 'backend', name: 'Backend Developer', track: 'Web', slug: 'backend',
    blurb: 'Designs the APIs, data and services behind an app.',
    core: [
      ['internet', 3, 'HTTP, DNS and hosting: how a request reaches your server and back.'],
      ['python|java|go|node|csharp|php|ruby|rust', 4, 'Pick one server language and go deep: its runtime, ecosystem and frameworks.'],
      ['git', 3, 'Version control and code review workflow.'],
      ['postgres', 3, 'Schema design, indexes, transactions and migrations.'],
      ['rest', 4, 'Resource design, status codes, pagination, versioning and OpenAPI docs.'],
      ['auth', 3, 'Sessions vs JWT, OAuth, hashing passwords, role-based access.'],
      ['caching', 3, 'Redis and HTTP caching to keep responses fast under load.'],
      ['testing', 3, 'Unit, integration and API tests you trust before deploying.'],
    ],
    plus: 'nosql:2 queues:2 docker:2 appsec:2 sysdesign:2 graphql:2 observability:2 cicd:2',
  },
  {
    id: 'fullstack', name: 'Full Stack Developer', track: 'Web', slug: 'full-stack',
    blurb: 'Ships features end to end, from the database to the UI.',
    core: [
      ['html_css', 3, 'Build and style responsive pages without fighting the layout.'],
      ['js', 4, 'One language on both client and server.'],
      ['react|vue|angular', 3, 'A frontend framework for the UI side of every feature.'],
      ['node', 3, 'An API server with routing, middleware and validation.'],
      ['postgres', 3, "Model and query your app's data."],
      ['rest', 3, 'Clean endpoints that the frontend can rely on.'],
      ['git', 3, 'Branches and pull requests across a whole codebase.'],
    ],
    plus: 'ts:3 auth:2 docker:2 cicd:2 aws:2 testing:2 linux:2',
  },
  {
    id: 'devops', name: 'DevOps Engineer', track: 'Infrastructure', slug: 'devops',
    blurb: 'Builds the paved road: pipelines, environments and reliable production.',
    core: [
      ['python|go|bash', 3, 'One scripting language to automate everything you do twice.'],
      ['linux', 4, 'Live in the terminal: processes, permissions, systemd, troubleshooting.'],
      ['networking', 3, 'DNS, HTTP/S, TLS, load balancers, firewalls and proxies.'],
      ['docker', 4, 'Write good Dockerfiles; use Compose for local stacks.'],
      ['k8s', 3, 'Deploy, scale and debug workloads on a cluster.'],
      ['cicd', 4, 'Pipelines in GitHub Actions or GitLab CI that build, test and deploy.'],
      ['iac', 3, 'Terraform modules that create cloud resources repeatably.'],
      ['aws', 3, 'Core services of one cloud: compute, storage, networking, IAM.'],
      ['observability', 3, 'Prometheus, Grafana, logs and alerts that wake the right person.'],
    ],
    plus: 'git:3 config_mgmt:2 appsec:2 os:2',
  },
  {
    id: 'android', name: 'Android Developer', track: 'Mobile', slug: 'android',
    blurb: 'Builds native apps for Android phones and tablets.',
    core: [
      ['kotlin', 4, 'Kotlin first: null safety, coroutines, data classes.'],
      ['android', 4, 'Activities, lifecycles, Jetpack Compose UIs and navigation.'],
      ['state', 3, 'App architecture with MVVM, ViewModel and StateFlow.'],
      ['rest', 3, 'Networking with Retrofit or Ktor and parsing JSON.'],
      ['sql', 2, 'Room and SQLite for offline storage.'],
      ['git', 3, 'Version control for app releases.'],
    ],
    plus: 'testing:2 java:2 cicd:2 a11y:2',
  },
  {
    id: 'ios', name: 'iOS Developer', track: 'Mobile', slug: 'ios',
    blurb: 'Builds native apps for iPhone and iPad.',
    core: [
      ['swift', 4, 'Optionals, protocols, value types and Swift concurrency.'],
      ['ios', 4, 'SwiftUI and UIKit, app lifecycle, navigation.'],
      ['state', 3, 'Architecture with MVVM and the Observation framework.'],
      ['rest', 3, 'URLSession networking and Codable JSON.'],
      ['git', 3, 'Version control for app releases.'],
    ],
    plus: 'testing:2 sql:2 a11y:2 cicd:2',
  },
  {
    id: 'ai_engineer', name: 'AI Engineer', track: 'Data & AI', slug: 'ai-engineer',
    blurb: 'Builds products on top of AI models: prompting, retrieval, agents and evals.',
    core: [
      ['python|ts', 4, 'Python or TypeScript to build AI features and glue them into apps.'],
      ['llm', 4, 'Call model APIs; write prompts that return reliable, structured output.'],
      ['rag', 3, 'Embeddings, vector databases and retrieval so answers come from your data.'],
      ['agents', 3, 'Agents that call tools and APIs over several steps.'],
      ['ai_evals', 3, 'Test sets and metrics to catch regressions; defend against prompt injection.'],
      ['rest', 3, 'Expose AI features through APIs your product can call.'],
    ],
    plus: 'ml:2 react:2 product:3 docker:2',
  },
  {
    id: 'ai_data_sci', name: 'AI & Data Scientist', track: 'Data & AI', slug: 'ai-data-scientist',
    blurb: 'Answers questions with data and builds models that predict.',
    core: [
      ['math', 3, 'Linear algebra, calculus and probability behind the models you use.'],
      ['stats', 4, 'Distributions, hypothesis tests and experiment design.'],
      ['python', 4, 'pandas, NumPy and notebooks for analysis.'],
      ['sql', 3, 'Pull and shape your own data.'],
      ['dataviz', 3, 'Explain findings with clear charts.'],
      ['ml', 4, 'scikit-learn models, feature engineering, validation.'],
      ['dl', 3, 'Neural networks with PyTorch: CNNs and transformers.'],
    ],
    plus: 'mlops:2 tech_writing:2 product:2',
  },
  {
    id: 'data_analyst', name: 'Data Analyst', track: 'Data & AI', slug: 'data-analyst',
    blurb: 'Turns raw data into answers and reports the business can act on.',
    core: [
      ['excel', 4, 'Formulas, pivot tables, lookups and cleaning messy data.'],
      ['sql', 4, 'Joins, aggregations and window functions to answer real questions.'],
      ['stats', 3, 'Descriptive stats, distributions and A/B test basics.'],
      ['dataviz', 3, 'Pick the right chart and keep it honest.'],
      ['bi_tools', 3, 'Dashboards in Power BI or Tableau that people use on their own.'],
      ['python', 2, 'pandas for analysis that outgrows spreadsheets.'],
    ],
    plus: 'tech_writing:3 product:3 data_model:2',
  },
  {
    id: 'bi_analyst', name: 'BI Analyst', track: 'Data & AI', slug: 'bi-analyst',
    blurb: 'Builds the dashboards and data models a company runs on.',
    core: [
      ['sql', 4, 'Write and tune the queries behind every report.'],
      ['excel', 3, 'Quick analysis and sharing with non-technical teams.'],
      ['data_model', 3, 'Star schemas: facts, dimensions and clean metrics.'],
      ['warehouse', 3, 'Work with the warehouse and its models.'],
      ['dataviz', 3, 'Charts that make the point at a glance.'],
      ['bi_tools', 4, 'Build and maintain dashboards in Power BI, Tableau or Looker.'],
    ],
    plus: 'stats:2 product:3 tech_writing:2 etl:2',
  },
  {
    id: 'data_engineer', name: 'Data Engineer', track: 'Data & AI', slug: 'data-engineer',
    blurb: 'Builds the pipelines and warehouses that move and shape data.',
    core: [
      ['python', 4, 'Pipeline code and data processing scripts.'],
      ['sql', 4, 'Complex queries and performance tuning.'],
      ['data_model', 3, 'Model tables for analytics and applications.'],
      ['etl', 4, 'Batch and streaming pipelines, orchestrated with Airflow or Dagster.'],
      ['warehouse', 3, 'Snowflake, BigQuery or Redshift, and lakehouse formats.'],
      ['spark', 3, 'Distributed processing with Spark.'],
      ['aws', 3, 'Cloud storage and managed data services.'],
    ],
    plus: 'queues:2 docker:2 nosql:2 cicd:2 iac:2',
  },
  {
    id: 'ml_engineer', name: 'Machine Learning Engineer', track: 'Data & AI', slug: 'machine-learning',
    blurb: 'Trains, ships and maintains models in production.',
    core: [
      ['python', 4, 'NumPy, pandas and clean, testable training code.'],
      ['math', 3, 'Enough linear algebra and calculus to debug training.'],
      ['stats', 3, 'Evaluation metrics, bias and variance.'],
      ['ml', 4, 'Train and evaluate models; avoid leakage and overfitting.'],
      ['dl', 3, 'PyTorch, transfer learning and fine-tuning.'],
      ['mlops', 3, 'Package, serve and monitor the models you train.'],
    ],
    plus: 'sql:2 docker:2 aws:2 dsa:3 spark:2',
  },
  {
    id: 'mlops', name: 'MLOps Engineer', track: 'Data & AI', slug: 'mlops',
    blurb: 'Builds the platform that takes models from notebook to production.',
    core: [
      ['python', 4, 'Glue code, pipelines and internal tooling.'],
      ['ml', 3, 'Understand the models you are shipping.'],
      ['docker', 4, 'Containerize training jobs and model servers.'],
      ['cicd', 3, 'Automate training, testing and deployment of models.'],
      ['mlops', 4, 'Experiment tracking, model registry, serving and drift monitoring.'],
      ['k8s', 3, 'Run training and inference at scale.'],
      ['aws', 3, 'Managed ML and compute services on a cloud.'],
    ],
    plus: 'iac:2 observability:3 linux:3 etl:2',
  },
  {
    id: 'dba', name: 'PostgreSQL DBA', track: 'Data & AI', slug: 'postgresql-dba',
    blurb: 'Keeps databases fast, safe and always available.',
    core: [
      ['sql', 4, 'Advanced SQL and reading EXPLAIN plans.'],
      ['postgres', 5, 'Deep PostgreSQL: MVCC, vacuum, configuration, extensions.'],
      ['data_model', 3, 'Schemas and constraints that keep data correct.'],
      ['linux', 3, 'Install, run and tune Postgres on Linux servers.'],
      ['db_ops', 4, 'Backups, point-in-time recovery, replication and failover.'],
      ['perf', 3, 'Indexing strategy, query tuning and monitoring.'],
    ],
    plus: 'bash:3 iac:2 observability:3 appsec:2',
  },
  {
    id: 'qa', name: 'QA Engineer', track: 'Quality & Security', slug: 'qa',
    blurb: 'Finds bugs before users do and builds the tests that keep releases safe.',
    core: [
      ['qa_basics', 4, 'Test plans, test cases, bug reports, and where testing fits in Agile.'],
      ['js|ts|python|java', 3, 'One language to write automated tests.'],
      ['testing', 4, 'UI automation with Playwright, Cypress or Selenium.'],
      ['rest', 3, 'API testing with Postman or in code.'],
      ['cicd', 3, 'Run test suites automatically on every change.'],
    ],
    plus: 'git:3 web_perf:2 appsec:2 a11y:2',
  },
  {
    id: 'cyber', name: 'Cyber Security Expert', track: 'Quality & Security', slug: 'cyber-security',
    blurb: 'Protects systems and data, and responds when something goes wrong.',
    core: [
      ['networking', 4, 'TCP/IP, ports, protocols, subnetting and firewalls.'],
      ['linux', 3, 'OS internals, permissions and logs (Windows too).'],
      ['crypto', 3, 'Hashing, encryption, PKI and TLS.'],
      ['appsec', 3, 'OWASP Top 10 and secure coding.'],
      ['threat', 3, 'Threat modeling and frameworks like NIST and MITRE ATT&CK.'],
      ['pentest', 3, 'Recon, exploitation and reporting, with permission.'],
      ['incident', 3, 'Detect, contain and investigate incidents; basic forensics.'],
    ],
    plus: 'python|bash:3 aws:2 auth:3',
  },
  {
    id: 'architect', name: 'Software Architect', track: 'Leadership', slug: 'software-architect',
    blurb: 'Shapes how large systems fit together over years.',
    core: [
      ['arch', 5, 'Architecture styles, patterns and trade-offs; writing decision records.'],
      ['sysdesign', 5, 'Design for scale, reliability and cost.'],
      ['distributed', 4, 'Consistency, partitioning and messaging between services.'],
      ['microservices', 4, 'Service boundaries, contracts and event-driven design.'],
      ['aws', 3, 'Cloud architecture and managed services.'],
      ['appsec', 3, 'Security architecture and threat modeling.'],
    ],
    plus: 'tech_writing:3 mentoring:3 data_model:3 product:3',
  },
  {
    id: 'eng_manager', name: 'Engineering Manager', track: 'Leadership', slug: 'engineering-manager',
    blurb: 'Leads a team: its people, its delivery and its technical health.',
    core: [
      ['mentoring', 4, '1:1s, feedback and growing careers.'],
      ['people_mgmt', 4, 'Hiring, performance reviews and team health.'],
      ['delivery', 4, 'Planning, estimates, risk and shipping on time.'],
      ['sysdesign', 3, 'Make sound technical calls together with your team.'],
      ['product', 3, 'Connect engineering work to business goals.'],
      ['code_review', 3, 'Set the bar for quality without becoming the bottleneck.'],
    ],
    plus: 'tech_writing:3 arch:2',
  },
  {
    id: 'gamedev', name: 'Game Developer', track: 'Specialist', slug: 'game-developer',
    blurb: 'Builds games: gameplay, engines, graphics and frame-time performance.',
    core: [
      ['math', 3, 'Vectors, matrices and geometry for movement, cameras and physics.'],
      ['cpp|csharp', 4, 'C++ for Unreal or C# for Unity.'],
      ['game_engine', 4, 'Build complete games in Unity, Unreal or Godot.'],
      ['graphics', 3, 'Rendering pipeline, shaders and lighting.'],
      ['perf', 3, 'Hit the frame budget: profile CPU and GPU.'],
    ],
    plus: 'dsa:3 concurrency:2 git:3',
  },
  {
    id: 'game_server', name: 'Server-Side Game Developer', track: 'Specialist', slug: 'server-side-game-developer',
    blurb: 'Builds the servers behind multiplayer games.',
    core: [
      ['cpp|csharp|go|java', 4, 'A fast server language for game logic.'],
      ['networking', 4, 'TCP vs UDP, sockets, latency and netcode.'],
      ['concurrency', 4, 'Threads, async I/O and lock-free structures.'],
      ['distributed', 3, 'Matchmaking and running many game servers at scale.'],
      ['postgres|nosql', 3, 'Store player data and game state.'],
    ],
    plus: 'caching:3 queues:2 docker:2 observability:2',
  },
  {
    id: 'blockchain', name: 'Blockchain Developer', track: 'Specialist', slug: 'blockchain',
    blurb: 'Builds smart contracts and the apps that use them.',
    core: [
      ['web3', 3, 'Consensus, wallets, transactions and gas.'],
      ['crypto', 3, 'The signatures and hashes that secure a chain.'],
      ['smart_contracts', 4, 'Write and deploy contracts in Solidity.'],
      ['testing', 3, 'Test contracts with Hardhat or Foundry before they hold real money.'],
      ['appsec', 3, 'Contract security: reentrancy, access control, audits.'],
      ['js|ts', 3, 'Connect dApps to contracts with ethers.js or viem.'],
    ],
    plus: 'react:2 git:3 rest:2',
  },
  {
    id: 'tech_writer', name: 'Technical Writer', track: 'Communication', slug: 'technical-writer',
    blurb: 'Writes the docs developers and users rely on.',
    core: [
      ['tech_writing', 5, 'Tutorials, how-tos, reference and explanations, each in the right place.'],
      ['product', 3, 'Know your audience and what they are trying to do.'],
      ['git', 3, 'Docs-as-code: Markdown, Git and pull requests.'],
      ['rest', 2, 'Read API specs and document endpoints clearly.'],
    ],
    plus: 'js|python:2 html_css:2',
  },
  {
    id: 'devrel', name: 'DevRel Engineer', track: 'Communication', slug: 'devrel',
    blurb: 'Helps developers succeed with a product, and brings their feedback back.',
    core: [
      ['js|python|ts', 3, 'Build demos and sample apps that actually run.'],
      ['rest', 3, 'Know the APIs you are advocating inside and out.'],
      ['tech_writing', 4, 'Blog posts, guides and tutorials that teach.'],
      ['speaking', 4, 'Talks, live streams, workshops and community building.'],
      ['product', 3, 'Turn community feedback into product input.'],
    ],
    plus: 'git:3 mentoring:3',
  },
];

const parseReq = (ids, lvl, w, note, step) => ({ ids: ids.split('|'), lvl, w, note: note || null, step });

export const ROLES = ROLE_DEFS.map((r) => ({
  id: r.id,
  name: r.name,
  track: r.track,
  slug: r.slug,
  blurb: r.blurb,
  req: [
    ...r.core.map(([ids, lvl, note], i) => parseReq(ids, lvl, 3, note, i + 1)),
    ...r.plus.split(' ').map((tok) => {
      const [ids, lvl] = tok.split(':');
      return parseReq(ids, Number(lvl), 1, null, null);
    }),
  ],
}));

export const ROLE_BY_ID = Object.fromEntries(ROLES.map((r) => [r.id, r]));

export const TRACKS = [...new Set(ROLES.map((r) => r.track))];

export const roadmapUrl = (slug) => `${ROADMAP_BASE}${slug}`;

export const QUICK_PICKS = ['js', 'ts', 'python', 'java', 'sql', 'git', 'html_css', 'react', 'rest', 'linux', 'docker', 'testing', 'excel', 'aws', 'go', 'node'];

export const SAMPLE_SKILLS = { js: 4, ts: 3, html_css: 4, react: 3, git: 3, rest: 2, sql: 2, node: 2, testing: 2, a11y: 1, docker: 1, internet: 2, tooling: 2 };

// Level given to a skill added with a quick tap ("I know this"). Users can fine-tune it later.
export const KNOWN_LEVEL = 3;

export const XP_PER_LEVEL = [0, 10, 25, 45, 70, 100];
export const XP_PER_LOG = 5;
export const XP_PER_STEP = 10;

export const TITLES = ['', 'Novice', 'Apprentice', 'Builder', 'Practitioner', 'Craftsperson', 'Specialist', 'Expert', 'Master', 'Virtuoso', 'Legend'];

// Extra words people type for a skill, beyond its display name. Lowercase.
// Used by the "type what you know" parser; tools map to the skill they imply.
export const ALIASES = {
  js: ['javascript', 'js', 'es6', 'ecmascript', 'jquery'],
  ts: ['typescript', 'ts'],
  python: ['python', 'py', 'django', 'flask', 'fastapi', 'pandas', 'numpy', 'jupyter'],
  java: ['java', 'spring', 'spring boot', 'jvm'],
  go: ['go', 'golang'],
  rust: ['rust'],
  cpp: ['c++', 'cpp', 'c'],
  csharp: ['c#', 'csharp', '.net', 'dotnet', 'asp.net'],
  kotlin: ['kotlin'],
  swift: ['swift'],
  php: ['php', 'laravel', 'symfony', 'wordpress'],
  ruby: ['ruby', 'rails', 'ruby on rails'],
  sql: ['sql', 't-sql', 'pl/sql'],
  bash: ['bash', 'shell', 'zsh', 'shell scripting', 'powershell'],
  internet: ['http', 'https', 'dns', 'internet'],
  html_css: ['html', 'css', 'html5', 'css3', 'sass', 'scss', 'tailwind', 'tailwindcss', 'bootstrap'],
  react: ['react', 'reactjs', 'react.js'],
  vue: ['vue', 'vuejs', 'vue.js'],
  angular: ['angular', 'angularjs'],
  ssr: ['next', 'nextjs', 'next.js', 'nuxt', 'remix', 'astro', 'sveltekit', 'ssr'],
  state: ['redux', 'zustand', 'mobx', 'pinia', 'state management', 'react query', 'tanstack query'],
  a11y: ['accessibility', 'a11y', 'wcag', 'aria'],
  web_perf: ['web performance', 'core web vitals', 'lighthouse'],
  design_sys: ['design system', 'design systems', 'storybook'],
  tooling: ['npm', 'yarn', 'pnpm', 'vite', 'webpack', 'eslint', 'prettier', 'babel'],
  rest: ['rest', 'rest api', 'restful', 'api design', 'openapi', 'swagger', 'apis', 'api'],
  graphql: ['graphql', 'apollo'],
  node: ['node', 'nodejs', 'node.js', 'express', 'nestjs', 'fastify', 'deno', 'bun'],
  auth: ['auth', 'oauth', 'jwt', 'authentication', 'authorization', 'sso', 'oidc'],
  queues: ['kafka', 'rabbitmq', 'sqs', 'pubsub', 'message queue', 'message queues'],
  caching: ['redis', 'memcached', 'caching', 'cache'],
  microservices: ['microservices', 'microservice'],
  postgres: ['postgres', 'postgresql', 'mysql', 'mariadb', 'sqlite', 'sql server', 'oracle', 'relational databases', 'rdbms'],
  nosql: ['nosql', 'mongodb', 'mongo', 'dynamodb', 'cassandra', 'firebase', 'firestore', 'couchdb'],
  data_model: ['data modeling', 'data modelling', 'schema design', 'erd'],
  etl: ['etl', 'elt', 'airflow', 'dagster', 'dbt', 'data pipelines', 'pipelines'],
  spark: ['spark', 'pyspark', 'hadoop', 'databricks', 'big data'],
  warehouse: ['snowflake', 'bigquery', 'redshift', 'data warehouse', 'data warehousing'],
  stats: ['statistics', 'stats', 'a/b testing', 'probability'],
  math: ['linear algebra', 'calculus', 'math', 'maths'],
  dataviz: ['data visualization', 'data visualisation', 'matplotlib', 'seaborn', 'd3', 'plotly', 'charts'],
  excel: ['excel', 'spreadsheets', 'google sheets', 'sheets'],
  bi_tools: ['power bi', 'powerbi', 'tableau', 'looker', 'metabase', 'bi'],
  db_ops: ['backups', 'replication', 'database administration', 'dba'],
  linux: ['linux', 'unix', 'ubuntu', 'debian', 'centos'],
  docker: ['docker', 'containers', 'docker compose', 'podman'],
  k8s: ['kubernetes', 'k8s', 'helm', 'openshift', 'eks', 'gke', 'aks'],
  aws: ['aws', 'gcp', 'azure', 'cloud', 'google cloud', 'amazon web services', 'ec2', 's3', 'lambda'],
  iac: ['terraform', 'pulumi', 'cloudformation', 'iac', 'infrastructure as code', 'opentofu'],
  config_mgmt: ['ansible', 'chef', 'puppet', 'saltstack'],
  cicd: ['ci/cd', 'cicd', 'ci', 'github actions', 'gitlab ci', 'jenkins', 'circleci', 'argocd'],
  observability: ['prometheus', 'grafana', 'datadog', 'monitoring', 'observability', 'elk', 'opentelemetry', 'new relic', 'sentry'],
  networking: ['networking', 'tcp/ip', 'tcp', 'udp', 'load balancing', 'nginx', 'firewalls'],
  ios: ['ios', 'swiftui', 'uikit', 'xcode'],
  android: ['android', 'jetpack compose', 'android studio'],
  cross_mobile: ['react native', 'flutter', 'dart', 'expo', 'ionic', 'xamarin'],
  appsec: ['owasp', 'appsec', 'application security', 'secure coding', 'security'],
  crypto: ['cryptography', 'encryption', 'tls', 'ssl', 'pki'],
  threat: ['threat modeling', 'threat modelling', 'mitre att&ck', 'nist'],
  pentest: ['pentesting', 'penetration testing', 'pentest', 'burp suite', 'metasploit', 'ethical hacking', 'ctf'],
  incident: ['incident response', 'forensics', 'siem', 'soc'],
  ml: ['machine learning', 'ml', 'scikit-learn', 'sklearn', 'xgboost'],
  dl: ['deep learning', 'pytorch', 'tensorflow', 'keras', 'neural networks', 'computer vision', 'nlp'],
  llm: ['llm', 'llms', 'prompt engineering', 'prompting', 'openai api', 'claude api', 'chatgpt', 'gpt', 'genai', 'generative ai'],
  rag: ['rag', 'vector search', 'embeddings', 'pinecone', 'pgvector', 'vector database', 'langchain', 'llamaindex'],
  agents: ['ai agents', 'agents', 'mcp', 'tool calling', 'function calling'],
  ai_evals: ['evals', 'ai evals', 'red teaming', 'ai safety'],
  mlops: ['mlops', 'mlflow', 'kubeflow', 'sagemaker', 'model serving'],
  os: ['operating systems', 'os internals'],
  concurrency: ['concurrency', 'multithreading', 'threads', 'async'],
  distributed: ['distributed systems', 'consensus', 'raft'],
  perf: ['profiling', 'performance tuning', 'optimization'],
  game_engine: ['unity', 'unreal', 'unreal engine', 'godot', 'game engine', 'game engines'],
  graphics: ['opengl', 'vulkan', 'directx', 'shaders', 'webgl', '3d graphics', 'graphics'],
  web3: ['blockchain', 'web3', 'ethereum', 'crypto wallets'],
  smart_contracts: ['solidity', 'smart contracts', 'hardhat', 'foundry'],
  git: ['git', 'github', 'gitlab', 'bitbucket', 'version control'],
  testing: ['testing', 'unit testing', 'jest', 'vitest', 'pytest', 'junit', 'cypress', 'playwright', 'selenium', 'tdd', 'e2e'],
  qa_basics: ['qa', 'quality assurance', 'manual testing', 'test cases', 'test plans'],
  dsa: ['algorithms', 'data structures', 'dsa', 'leetcode', 'big o'],
  sysdesign: ['system design', 'scalability'],
  code_review: ['code review', 'code reviews', 'pull requests'],
  arch: ['software architecture', 'architecture', 'design patterns', 'clean architecture', 'ddd', 'domain-driven design'],
  tech_writing: ['technical writing', 'documentation', 'docs', 'markdown', 'writing'],
  mentoring: ['mentoring', 'coaching', 'mentorship'],
  people_mgmt: ['people management', 'hiring', 'managing people', 'management'],
  delivery: ['project management', 'agile', 'scrum', 'kanban', 'jira', 'delivery'],
  product: ['product', 'product sense', 'product management', 'ux'],
  speaking: ['public speaking', 'speaking', 'talks', 'community', 'developer relations', 'devrel'],
};
