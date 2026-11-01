// Single source of truth for profile content. Edit here; every page reads from it.

export const domains = ['Lending', 'Fraud', 'Collections', 'Financial documents', 'Consumer apps'];

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

// Skill map for the home page, grouped by the question each skill answers. Projects are
// deliberately terse: what was done and what it moved, not how.
export type Case = { code: string; what: string; result?: string; stack?: string[]; href?: string; expand?: 'chess' };
export type SubSkill = { name: string; cases?: Case[]; items?: string[] };
export type SkillArea = { id: string; name: string; tagline: string; subs: SubSkill[] };

export const skillAreas: SkillArea[] = [
  {
    id: 'predict',
    name: 'Predict',
    tagline: 'What will happen next?',
    subs: [
      {
        name: 'Time series',
        cases: [
          { code: 'Forward Look', what: 'Forecasts for Finance, built on trend and seasonality.', stack: ['Prophet'] },
        ],
      },
      {
        name: 'Regression',
        cases: [
          { code: 'Revaluation', what: 'Bond-risk research combining yield curves, convex optimization and machine learning.', stack: ['Convex optimization', 'Fixed income'], href: 'https://github.com/JuviHerman/Revaluations' },
        ],
      },
    ],
  },
  {
    id: 'detect',
    name: 'Detect',
    tagline: 'What is risky, or quietly wrong?',
    subs: [
      {
        name: 'Fraud',
        cases: [
          { code: 'Quiet Signals', what: 'Fraud-detection rules for a lending population.', result: 'Fraud down 2.5%' },
        ],
      },
      {
        name: 'Graph signals',
        cases: [
          { code: 'Network Effects', what: 'Behavioral and graph-based features that surface risk hiding in connections.', stack: ['Graph features', 'GNNs', 'Neptune'] },
        ],
      },
    ],
  },
  {
    id: 'rank',
    name: 'Rank',
    tagline: 'What comes first?',
    subs: [
      {
        name: 'Risk scoring',
        cases: [
          { code: 'Three Markets', what: 'Credit-risk scores that order applicants from safest to riskiest in three countries, owned from the first feature to production monitoring.', result: '+0.07 ROC-AUC over baseline', stack: ['LightGBM', 'SHAP', 'Optuna'] },
        ],
      },
    ],
  },
  {
    id: 'decide',
    name: 'Decide',
    tagline: 'Which treatment to provide, and which action pays off?',
    subs: [
      {
        name: 'Uplift modeling',
        cases: [
          { code: 'Second Call', what: 'A decisioning layer for Collections that picks each customer’s treatment by their estimated response: not who will pay, but who will pay because we acted.', stack: ['Uplift models', 'Causal inference'] },
        ],
      },
      {
        name: 'Thresholds',
        cases: [
          { code: 'The Cutoff', what: 'Price the two kinds of mistake, then find the threshold that costs least. Try it below.', stack: ['ROC', 'Cost curves'], href: '/#lab' },
        ],
      },
      {
        name: 'Sampling',
        cases: [
          { code: 'Night Shift', what: 'A live two-armed bandit over my own chess games: Mac at night or phone by day. Bayes-UCB picks the next game; the data refreshes daily.', stack: ['Beta posteriors', 'Bayes-UCB', 'chess.com API'], expand: 'chess' },
        ],
      },
      { name: 'Experimentation', items: ['A/B testing', 'Causal inference', 'Imbalanced data'] },
    ],
  },
  {
    id: 'evaluate',
    name: 'Evaluate',
    tagline: 'Which model can we trust?',
    subs: [
      {
        name: 'LLM evaluations',
        cases: [
          { code: 'Seven Readers', what: 'Seven LLMs from the leading AI labs, including Meta, Amazon, Google and Anthropic, put head to head on parsing financial documents, scored with metrics designed for the task.', result: 'Accuracy, price and latency compared', stack: ['Evaluation design', 'Document parsing'] },
        ],
      },
      { name: 'Model checks', items: ['Explainability', 'SHAP', 'Drift monitoring', 'Feature-accuracy validation'] },
    ],
  },
  {
    id: 'build',
    name: 'Build',
    tagline: 'Does it run for real?',
    subs: [
      {
        name: 'Agentic workflows',
        cases: [
          { code: 'Autopilot', what: 'Agents that train models, validate feature accuracy and parse documents, with a human signing off at the checkpoints.', stack: ['Agent skills', 'MCP', 'AWS Bedrock'] },
        ],
      },
      {
        name: 'Apps',
        cases: [
          { code: 'The Global Min', what: 'A data-science interview-prep app with 900+ adaptive scenario questions across nine topics, written with an LLM content pipeline and automated quality checks.', result: 'On the App Store', stack: ['SwiftUI', 'LLM content pipeline'], href: 'https://theglobalmin.app' },
        ],
      },
      { name: 'Languages', items: ['Python', 'SQL', 'Gremlin'] },
      { name: 'Building with AI', items: ['Claude Code', 'MCP', 'AWS Bedrock', 'OpenAI', 'RAG'] },
      { name: 'Modeling', items: ['LightGBM', 'XGBoost', 'CatBoost', 'scikit-learn', 'PyTorch Geometric', 'Prophet', 'Optuna'] },
      { name: 'Production', items: ['MLflow', 'SageMaker', 'Docker', 'Lambda', 'Step Functions', 'Git'] },
      { name: 'Data', items: ['AWS', 'Snowflake', 'Redshift', 'Neptune'] },
    ],
  },
];
