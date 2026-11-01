// Single source of truth for profile content. Edit here; every page reads from it.

export const domains = ['Lending', 'Fraud', 'Collections', 'Ports & logistics', 'Financial documents', 'Consumer apps'];

export const profile = {
  name: 'Yuval Herman',
  role: 'Senior Data Scientist',
  location: 'Tel Aviv, Israel',
  email: 'yuvalherm@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hermanyuval',
  github: 'https://github.com/JuviHerman',
  summary:
    'Data scientist with 6 years of experience turning data into decisions: prediction, risk and fraud, ranking, causal decisioning and LLM evaluation. Before that, a CPA: I audited companies, ran the numbers as a controller, and wrote software for an accounting firm.',
};

export type Job = {
  title: string;
  company: string;
  place?: string;
  start: string;
  end: string;
  points: string[];
};

export const jobs: Job[] = [
  {
    title: 'Data Scientist',
    company: 'Fido Credit Solutions',
    place: 'Tel Aviv',
    start: '2020',
    end: 'Present',
    points: [
      'Owned credit-risk modeling across three international markets, from feature development and model evaluation through deployment and monitoring, improving ROC-AUC by 0.07 (absolute) over baseline models.',
      "Developed a causal decisioning layer for Collections using uplift modeling, driving treatment decisions by each customer's estimated response.",
      'Built time-series regression forecasts for Finance using Prophet, modeling trend and seasonality.',
      'Developed and introduced multiple fraud-detection rules for the lending population, reducing fraud by 2.5%.',
      'Engineered behavioral and graph-based features into risk-model pipelines.',
      'Designed GenAI-automated workflows for model training, feature-accuracy validation and document parsing, built from reusable agent skills, agentic loops and human-in-the-loop review checkpoints.',
    ],
  },
  {
    title: 'Software Developer & Blockchain Administrator',
    company: 'Dov & Co, CPA',
    start: '2018',
    end: '2020',
    points: [
      'Developed financial software and blockchain-related applications; advised on digital-asset regulation, compliance and tax.',
    ],
  },
  {
    title: 'Financial Auditor',
    company: 'UHY Israel',
    start: '2015',
    end: '2018',
    points: [
      'Audited public and private companies and supported financial reporting; also served as controller at a listed financial-services firm.',
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Programming', items: ['Python', 'SQL', 'Gremlin'] },
  {
    group: 'Machine learning',
    items: ['LightGBM', 'XGBoost', 'CatBoost', 'scikit-learn', 'PyTorch Geometric (GNNs)', 'Prophet', 'Optuna', 'SHAP'],
  },
  {
    group: 'Statistics & experimentation',
    items: ['A/B testing', 'Time-series forecasting', 'Causal inference', 'Uplift modeling', 'Imbalanced data', 'Explainability', 'Drift monitoring'],
  },
  { group: 'Applied AI', items: ['LLM agents', 'RAG', 'Evaluations', 'MCP', 'AWS Bedrock', 'OpenAI'] },
  { group: 'MLOps & deployment', items: ['MLflow', 'SageMaker', 'Docker', 'Git', 'Lambda', 'Step Functions'] },
  { group: 'Data & cloud', items: ['AWS', 'Snowflake', 'Redshift', 'Neptune Graph'] },
];

export type Project = { name: string; blurb: string; href?: string; linkLabel?: string; tags: string[] };

export const projects: Project[] = [
  {
    name: 'The Global Min',
    blurb:
      'A data-science interview-prep app for iOS with 900+ adaptive scenario questions across nine topics. It finds your level per topic and moves you up. The question bank was built with LLM-assisted generation and automated quality checks.',
    href: 'https://theglobalmin.app',
    linkLabel: 'theglobalmin.app',
    tags: ['iOS', 'SwiftUI', 'LLM content pipeline'],
  },
  {
    name: 'Revaluation',
    blurb:
      'Finance research applying convex optimization, yield-curve modeling and machine learning to bond-risk analysis.',
    href: 'https://github.com/JuviHerman/Revaluations',
    linkLabel: 'Source on GitHub',
    tags: ['Convex optimization', 'Fixed income', 'Python'],
  },
  {
    name: 'Bank-to-books matching',
    blurb:
      'Matches and clears compatible transactions between a business ledger and its bank statement, the reconciliation step accountants otherwise do by hand.',
    href: 'https://github.com/JuviHerman/Banks_books_match-v1',
    linkLabel: 'Source on GitHub',
    tags: ['Accounting automation', 'Python'],
  },
  {
    name: 'Crypto capital-gains tooling',
    blurb:
      'Tools that pull trade history from the BitcoinTaxes API and turn it into capital-gains reports that a tax authority can read.',
    href: 'https://github.com/JuviHerman/BitcoinTaxesAPI',
    linkLabel: 'Source on GitHub',
    tags: ['Digital-asset tax', 'APIs', 'Python'],
  },
];

export const education = [
  { name: 'Data Science Fellowship', org: 'Israel Tech Challenge (ITC)', year: '2020', note: 'Selective program in machine learning, deep learning, computer vision and NLP.' },
  { name: 'B.A., Business Management (Accounting & Statistics)', org: 'The Academic College of Management', year: '2012' },
  { name: 'Certified Public Accountant (CPA)', org: 'Israel' },
];

export const languages = ['Hebrew (native)', 'English (native)'];

// "Happy to talk about": conversations I can lead in an interview or over coffee.
export const talks: { group: string; points: string[] }[] = [
  {
    group: 'Models and money',
    points: [
      'Why ROC-AUC isn’t a business metric, and what to put a price on instead.',
      'Setting a cutoff when a missed default and a declined good customer cost very different amounts.',
      'Rules or models in fraud, and when a simple rule wins.',
      'Finding risk in who is connected to whom: graph features in credit.',
      'Forecasts Finance can plan on, and how to talk about their uncertainty.',
    ],
  },
  {
    group: 'Decisions under uncertainty',
    points: [
      'Who will pay, versus who will pay because we called: uplift in collections.',
      'Self-cure: when the best treatment is no treatment at all.',
      'Bandits or A/B tests, and how to know when to stop exploring.',
      'Declaring a winner: probability of being best, and why I wait for 95%.',
      'Turning $80K a day at anchor against $3K a day of cranes into a scheduling rule.',
      'Ranking under physical constraints: which container belongs on top.',
    ],
  },
  {
    group: 'GenAI in practice',
    points: [
      'Evaluating LLMs on a real task: accuracy, price and latency together.',
      'Where agents speed up data science work, and where a human must sign off.',
      'Building a content pipeline with LLMs, and the quality checks it needs.',
    ],
  },
  {
    group: 'How I work',
    points: [
      'Reading a model like a ledger: what an auditor’s eye catches in data.',
      'Owning a model from the first feature to monitoring in production.',
      'Shipping a product on my own, from idea to the App Store.',
    ],
  },
];

// Skill map for the home page: a few broad areas, each a grid of project cards.
// Projects are deliberately terse. Wrap the action verbs in *asterisks* to highlight them.
export type Case = { code: string; skill: string; what: string; result?: string; stack?: string[]; href?: string; linkLabel?: string; expand?: 'chess' };
export type SkillArea = { id: string; name: string; tagline: string; cases: Case[]; also?: { name: string; items: string[] }[] };

export const skillAreas: SkillArea[] = [
  {
    id: 'predict',
    name: 'Predict & detect',
    tagline: 'Models that score, flag and forecast.',
    cases: [
      { code: 'Three Markets', skill: 'Credit risk', what: '*Scored* credit risk for lending in three countries, *owned* from the first feature to production monitoring.', result: '+0.07 ROC-AUC over baseline', stack: ['LightGBM', 'SHAP', 'Optuna'] },
      { code: 'Quiet Signals', skill: 'Fraud', what: '*Detected* fraud in a lending population with rules that *catch* what the models missed.', result: 'Fraud down 2.5%', stack: ['Rules', 'Imbalanced data'] },
      { code: 'Network Effects', skill: 'Graph features', what: '*Engineered* behavioral and graph features that *surface* risk hiding in connections.', stack: ['GNNs', 'Neptune', 'Gremlin'] },
      { code: 'Forward Look', skill: 'Time series', what: '*Forecast* the numbers Finance plans on, from trend and seasonality.', stack: ['Prophet'] },
      { code: 'Revaluation', skill: 'Regression', what: '*Priced* bond risk with yield curves, convex optimization and machine learning.', stack: ['Convex optimization', 'Fixed income'], href: 'https://github.com/JuviHerman/Revaluations', linkLabel: 'Code' },
    ],
  },
  {
    id: 'decide',
    name: 'Decide & optimize',
    tagline: 'Which treatment to provide, and which action pays off?',
    cases: [
      { code: 'Self Cure', skill: 'Uplift modeling', what: '*Separated* collections customers who repay on their own from those who need a nudge, so treatment *goes* where it changes the outcome.', stack: ['Uplift models', 'Causal inference'] },
      { code: 'Berth Call', skill: 'Optimization', what: '*Chose* which container ship enters port next: $80K a day at anchor against $3K a day of lift work, with food *cleared* first and pickups *timed*.', result: 'Lowest net cost across decision points', stack: ['Decision modeling', 'Cost optimization'] },
      { code: 'Stack Order', skill: 'Ranking', what: '*Ranked* where each container goes in port storage, so urgent ones like food never *wait* under six others for the lift.', stack: ['Ranking', 'Logistics'] },
      { code: 'The Cutoff', skill: 'Thresholds', what: '*Price* every cell of a confusion matrix, then *slide* to the most profitable threshold.', stack: ['Confusion matrix', 'Net profit'], href: '/#lab', linkLabel: 'Try it' },
      { code: 'Chess Arm Bandits', skill: 'Sampling', what: 'A live two-armed bandit that *picks* my next chess game, Mac at night or phone by day, and *refreshes* daily.', stack: ['Beta posteriors', 'Bayes-UCB', 'chess.com API'], expand: 'chess' },
    ],
    also: [
      { name: 'Sampling', items: ['Random sampling', 'Reservoir sampling', 'Importance sampling', 'Multi-armed bandits'] },
      { name: 'Experimentation', items: ['A/B testing', 'Causal inference', 'Imbalanced data'] },
    ],
  },
  {
    id: 'build',
    name: 'Evaluate & build',
    tagline: 'Which model can we trust, and does it run for real?',
    cases: [
      { code: 'Seven Readers', skill: 'LLM evaluation', what: '*Benchmarked* seven LLMs from Meta, Amazon, Google, Anthropic and others on parsing financial documents, with metrics *designed* for the task.', result: 'Accuracy, price and latency compared', stack: ['Evaluation design', 'Document parsing'] },
      { code: 'Autopilot', skill: 'Agentic workflows', what: '*Built* agents that train models, validate features and parse documents, with a human *signing off* at the checkpoints.', stack: ['Agent skills', 'MCP', 'AWS Bedrock'] },
      { code: 'The Global Min', skill: 'App', what: '*Shipped* an iOS interview-prep app with 900+ adaptive questions across nine topics, *written* with an LLM content pipeline.', result: 'On the App Store', stack: ['SwiftUI', 'LLM pipeline'], href: 'https://theglobalmin.app', linkLabel: 'Visit' },
    ],
    also: [
      { name: 'Model checks', items: ['Explainability', 'SHAP', 'Drift monitoring', 'Feature-accuracy validation'] },
    ],
  },
  {
    id: 'tools',
    name: 'Toolkit',
    tagline: 'What I reach for every day.',
    cases: [],
    also: [
      { name: 'Languages', items: ['Python', 'SQL', 'Gremlin'] },
      { name: 'Building with AI', items: ['Claude Code', 'MCP', 'AWS Bedrock', 'OpenAI', 'RAG'] },
      { name: 'Modeling', items: ['LightGBM', 'XGBoost', 'CatBoost', 'scikit-learn', 'PyTorch Geometric', 'Prophet', 'Optuna'] },
      { name: 'Production', items: ['MLflow', 'SageMaker', 'Docker', 'Lambda', 'Step Functions', 'Git'] },
      { name: 'Data', items: ['AWS', 'Snowflake', 'Redshift', 'Neptune'] },
    ],
  },
];
