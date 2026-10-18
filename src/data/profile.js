/**
 * Single source of truth for portfolio content (both Clean and Ultra modes).
 * Derived from master_profile.json — only items marked "keep" / verified there.
 * Numbers match the published resumes; update both together.
 */

export const person = {
  name: 'Siddhant Singh',
  role: 'AI/ML & Backend Engineer',
  tagline: 'I make models small and fast enough to run on a phone, and build the production backends around them.',
  location: 'Bengaluru, India',
  availability: 'Open to full-time roles · Onsite, hybrid or remote',
  email: 'siddhant3103@gmail.com',
  links: {
    github: 'https://github.com/SID-singh1',
    linkedin: 'https://www.linkedin.com/in/siddhant-singh-3283ab268/',
    leetcode: 'https://leetcode.com/u/_SID_SINGH/',
  },
};

export const resumes = [
  {
    id: 'sde',
    label: 'Resume · SDE',
    hint: 'Backend & distributed systems',
    href: '/resume/Siddhant_Singh_Resume_SDE.pdf',
  },
  {
    id: 'aiml',
    label: 'Resume · AI/ML',
    hint: 'Model optimization & GenAI',
    href: '/resume/Siddhant_Singh_Resume_AIML.pdf',
  },
];

// The 4 numbers a recruiter should leave with.
export const proofStats = [
  { value: 'Samsung R&D', label: 'AI/ML Research Intern, 2026' },
  { value: '97.9%', label: 'On-device model at 2.9 MB, beat its teacher' },
  { value: '1837', label: 'LeetCode rating · 700+ solved' },
  { value: '8.99', label: 'CGPA · B.Tech CSE, VIT 2026' },
];

export const experience = [
  {
    id: 'samsung',
    org: 'Samsung R&D Institute India (SRI-B)',
    title: 'AI/ML Research Intern',
    program: 'Samsung PRISM',
    period: 'Jan 2026 – Aug 2026',
    location: 'Remote · Bengaluru',
    summary:
      'Built an on-device document-image classifier for budget Android phones: EfficientNet-B4 teacher distilled into a MobileNetV2 student, quantized to INT8, shipped in a fully offline Android app.',
    metrics: [
      { value: '97.9%', label: 'Student accuracy', note: 'teacher 95.1%' },
      { value: '2.9 MB', label: 'INT8 model size' },
      { value: '<10 ms', label: 'Inference on NPU', note: '<50 ms CPU-only' },
      { value: '8.3 → 69.4%', label: 'Worst-class recall', note: 'real-world phone set' },
    ],
    highlights: [
      'Diagnosed plain INT8 post-training quantization collapsing F1 (0.95 → 0.74) and switched to quantization-aware distillation, which recovered it and beat the teacher.',
      'Traced ~100 ms in-app latency to the NNAPI delegate not engaging (not model size); fixed a double-preprocessing bug and a uint8 wraparound bug in evaluation.',
      'Built a 486-image phone-captured test set (84.1% vs ~98% clean), traced a "book-attractor" failure to the teacher\'s decision boundary, and fixed it with targeted data (819 → 1,619 images).',
      'Dataset cleaning with pHash deduplication and CLIP zero-shot triage; Android app does gallery and live-camera classification with auto-sorting, fully offline.',
    ],
    stack: ['TensorFlow / TFLite', 'Knowledge Distillation', 'INT8 QAD', 'CLIP', 'Android', 'NNAPI'],
  },
];

export const projects = [
  {
    id: 'prompt-memory',
    name: 'Prompt Memory',
    kind: 'GenAI product',
    tagline: 'Chrome extension + FastAPI backend that rewrites your prompts in ChatGPT, Claude, Gemini and Perplexity using your own vector memory.',
    metrics: [
      { value: '443', label: 'tests in CI' },
      { value: '0', label: 'cross-user leaks' },
      { value: '91.7%', label: 'recall@k' },
    ],
    highlights: [
      'LLM failover (Groq key rotation → Gemini → OpenRouter) with auto-eviction of deprecated models, built after an upstream deprecation caused a silent outage.',
      'Google OAuth2 + JWT, per-tier quotas, and a user-keyed sliding-window rate limiter after IP limits failed behind the Hugging Face proxy.',
      'Tenant isolation enforced on every vector query; SSE streaming; GitHub Actions auto-deploys to Hugging Face Spaces.',
    ],
    stack: ['FastAPI', 'Qdrant', 'MongoDB', 'SSE', 'Chrome MV3', 'OAuth2 / JWT'],
    links: {},
    status: 'Pre-launch',
  },
  {
    id: 'distqueue',
    name: 'Distqueue',
    kind: 'Distributed systems',
    tagline: 'A Celery-style job queue built from scratch on Redis Streams, with at-least-once delivery and dead-worker recovery.',
    metrics: [
      { value: '6,200/s', label: 'enqueues · p99 0.37 ms' },
      { value: '2,000/s', label: 'jobs per worker' },
      { value: '~95%', label: 'core coverage · 52 tests' },
    ],
    highlights: [
      'Heartbeat-based dead-worker detection (5 s refresh, 15 s TTL) with XAUTOCLAIM; a chaos test SIGKILLs a worker mid-job and a survivor completes it.',
      'Atomic Lua script prevents delayed-job double-injection; exponential backoff with jitter and a dead-letter queue.',
      'Prometheus + Grafana via Docker Compose. Benchmarks on local Redis.',
    ],
    stack: ['Python', 'Redis Streams', 'Lua', 'Docker', 'Prometheus', 'Grafana'],
    links: {},
    status: 'In progress',
  },
  {
    id: 'vaani',
    name: 'Vaani',
    kind: 'On-device voice AI',
    tagline: 'Turns Hindi/Hinglish voice notes into a summary, action items and sentiment, fully offline on a CPU or via a Telegram bot.',
    metrics: [
      { value: '−68.7%', label: 'LLM footprint · 7.29 → 2.28 GB' },
      { value: '2.1×', label: 'CPU generation speed' },
      { value: '₹0', label: 'per month offline' },
    ],
    highlights: [
      'One env flag switches between offline CPU inference (Whisper ONNX INT8 + Phi-3-mini GGUF INT4) and a cloud-API mode for the deployed bot.',
      'Fixed Whisper hallucination and OOM on long audio with sliding-window chunking and a forced language hint.',
      'Async FastAPI proxying a native llama-server; schema-constrained JSON output stored in PostgreSQL.',
    ],
    stack: ['FastAPI', 'Whisper (ONNX)', 'llama.cpp', 'PostgreSQL', 'MLflow', 'Telegram'],
    links: {},
    status: 'Deployed',
  },
  {
    id: 'aqcap',
    name: 'AQCAP',
    kind: 'LLM quantization research',
    tagline: 'Layer-sensitivity-guided mixed-precision quantization that fits a 3.8B LLM vulnerability detector into a 4 GB GPU.',
    metrics: [
      { value: '−58.3%', label: 'VRAM · 7.29 → 3.04 GB' },
      { value: 'F1 0.85', label: 'vs supervised baseline 0.83' },
      { value: 'S grade', label: 'solo capstone' },
    ],
    highlights: [
      'Profiled all 32 transformer layers of Phi-3-mini with PyTorch hooks to derive a Layer Sensitivity Index guiding NF4/INT8 assignment.',
      'Recall 0.93 at zero training cost across 6 configurations; found prompt engineering (+0.10 F1) mattered more than architecture changes.',
    ],
    stack: ['PyTorch', 'HuggingFace', 'bitsandbytes', 'NF4 / INT8'],
    links: {},
    status: 'Completed',
  },
  {
    id: 'smart-glasses',
    name: 'AI Smart Glasses Assistant',
    kind: 'Multimodal AI',
    tagline: 'Camera feed → vision-language scene captioning → productivity classification, scored against your schedule.',
    metrics: [
      { value: '2', label: 'models routed (VLM + LLM)' },
      { value: '1–10', label: 'productivity score' },
      { value: 'Live', label: 'demo given' },
    ],
    highlights: [
      'Real-time multimodal pipeline with hybrid routing between Gemini 2.5 Flash for scene captioning and Llama-3.3-70B for classification.',
      'Stateful session manager tracks activity transitions and scores productivity against the user\'s schedule.',
    ],
    stack: ['Python', 'Gemini 2.5 Flash', 'Llama-3.3-70B', 'OpenCV', 'Streamlit'],
    links: {},
    status: 'Completed',
  },
];

// Only evidence-backed skills (see master_profile.json "keep" verdicts).
export const skillGroups = [
  {
    title: 'Model optimization',
    items: ['Knowledge distillation', 'INT8 PTQ / QAD', 'NF4 & mixed precision', 'GGUF / llama.cpp', 'ONNX Runtime', 'TFLite + NNAPI'],
  },
  {
    title: 'ML & GenAI',
    items: ['PyTorch', 'TensorFlow', 'HuggingFace', 'RAG', 'Whisper', 'CLIP', 'Structured LLM output'],
  },
  {
    title: 'Backend & infra',
    items: ['FastAPI (async)', 'Redis Streams', 'PostgreSQL', 'MongoDB', 'Qdrant', 'Docker', 'GitHub Actions', 'Prometheus / Grafana'],
  },
  {
    title: 'Languages & core',
    items: ['Python', 'C++', 'Java', 'JavaScript', 'SQL', 'DSA', 'Distributed systems', 'Concurrency'],
  },
];

export const education = {
  school: 'Vellore Institute of Technology (VIT), Vellore',
  degree: 'B.Tech, Computer Science & Engineering',
  period: '2022 – 2026',
  grade: 'CGPA 8.99 / 10',
};

export const achievements = [
  { title: 'LeetCode 1837', detail: '700+ problems solved', href: 'https://leetcode.com/u/_SID_SINGH/' },
  { title: 'VIT Top Coders', detail: 'Top 200 of 15,000 students' },
  { title: 'GATE 2026 (CS)', detail: 'AIR 3966' },
  { title: 'AWS Certified', detail: 'Cloud Practitioner' },
];
