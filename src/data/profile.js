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

// Deeper write-ups shown when a project card is expanded.
export const projectDetails = {
  'prompt-memory': {
    problem: 'Prompts typed into chat UIs lack your own context, so you re-explain yourself every time.',
    built:
      'A Manifest V3 extension that injects into ChatGPT, Claude, Gemini and Perplexity, backed by a FastAPI service with per-user vector memory and a multi-stage LLM rewrite pipeline streamed over SSE, plus auth, quotas, failover, analytics and CI/CD.',
    more: [
      '5-stage pipeline: retrieval → semantic enrichment → prompt expansion → LLM → streamed response, over Qdrant and multilingual Sentence-Transformers (MiniLM).',
      'Distinct handling of 429, 401 and 5xx errors with mid-request failover on both sync and SSE endpoints; ONNX-backed eager model preloading removes cold starts.',
      'Voice-to-prompt through Groq Whisper (20+ languages, including Hinglish).',
      'HMAC-secured private analytics dashboard with anonymized user IDs, structured JSON logging and health endpoints.',
      '443 tests (61% backend coverage); LLM and vector-DB calls mocked to test retries and streaming; GitHub Actions auto-deploys to Hugging Face Spaces.',
    ],
    stack: ['Python', 'FastAPI', 'Qdrant', 'Sentence-Transformers (MiniLM)', 'MongoDB', 'SSE', 'Chrome MV3', 'Google OAuth2', 'JWT', 'Groq (LLM + Whisper)', 'Gemini', 'OpenRouter', 'ONNX Runtime', 'pytest', 'GitHub Actions', 'Hugging Face Spaces', 'Vercel'],
  },
  distqueue: {
    problem: 'Understand delivery guarantees, failure recovery and race conditions by building a Celery-style queue from first principles.',
    built:
      'Producers enqueue to a Redis Stream; consumer-group workers process and ack; separate scheduler (delayed jobs) and monitor (dead-worker recovery) services handle the rest.',
    more: [
      'At-least-once delivery with atomic MULTI/EXEC enqueue: ~6,200 enqueues/s (p99 0.37 ms) and ~2,000 jobs/s per worker on local Redis.',
      'Daemon-thread heartbeats (5 s refresh, 15 s TTL) detect dead workers; XAUTOCLAIM reclaims their jobs.',
      'Chaos test SIGKILLs a worker mid-job and asserts a survivor completes it.',
      'Atomic Lua script prevents delayed-job double-injection; retries use exponential backoff with jitter and a dead-letter queue.',
      '52 unit, integration and chaos tests at ~95% core coverage; Prometheus + Grafana dashboards via Docker Compose.',
    ],
    stack: ['Python', 'Redis Streams', 'Lua', 'Docker', 'Docker Compose', 'Prometheus', 'Grafana', 'pytest'],
  },
  vaani: {
    problem: 'Hindi/Hinglish voice notes are hard to search or act on, and cloud transcription costs money and sends private audio off-device.',
    built:
      'Audio from the browser or Telegram → ffmpeg (webm → 16 kHz wav) → Whisper → LLM → strict JSON (summary, action items, sentiment) → PostgreSQL. One env flag switches between fully offline CPU inference and cloud APIs.',
    more: [
      'Quantization benchmarks tracked in MLflow + llama-bench: LLM footprint 7.29 → 2.28 GB (−68.7%), CPU generation 3.70 → 7.81 tok/s (2.1×).',
      'Async FastAPI proxies a native llama-server daemon, so inference never blocks on the GIL.',
      'Sliding-window chunking plus a forced language hint fixed Whisper hallucination and out-of-memory errors on audio over 30 s.',
      'IP rate limiting, login-free per-user history via UUID provisioning, key-protected admin dashboard (users, requests, 7/14-day activity).',
      'Vanilla-JS frontend with a Web Audio waveform; cloud mode powers a Telegram bot deployed on Render.',
    ],
    stack: ['Python', 'FastAPI (async)', 'Whisper-small (ONNX INT8)', 'Phi-3-mini (GGUF INT4)', 'llama.cpp / llama-server', 'ffmpeg', 'PostgreSQL', 'MLflow', 'llama-bench', 'JavaScript', 'Web Audio', 'Telegram Bot API', 'Render'],
  },
  aqcap: {
    problem: 'Run an LLM-based code-vulnerability (CWE) detector on a 4 GB GPU without losing accuracy.',
    built:
      'Per-layer sensitivity profiling through PyTorch forward hooks → a Layer Sensitivity Index → NF4/INT8 mixed-precision assignment, evaluated across 6 configurations.',
    more: [
      'Profiled all 32 transformer layers of Phi-3-mini (3.82B parameters).',
      'VRAM 7.29 → 3.04 GB (−58.3%), fitting the 4 GB budget.',
      'F1 0.85 / recall 0.93 at 8.6 tok/s on an NVIDIA T4 with zero training cost, beating the supervised LineVul baseline (F1 0.83).',
      'Found prompt engineering (+0.10 F1) to be a stronger lever than architectural changes.',
      'Solo capstone under faculty guidance, graded S (highest).',
    ],
    stack: ['Python', 'PyTorch', 'HuggingFace Transformers', 'bitsandbytes', 'Phi-3-mini (3.82B)', 'NF4', 'INT8', 'NVIDIA T4'],
  },
  'smart-glasses': {
    problem: 'Help someone see how their day is actually going against the schedule they planned.',
    built:
      'Camera feed → vision-language scene captioning → productivity classification → a 1–10 score against the user\'s schedule, demoed live.',
    more: [
      'Hybrid routing between Gemini 2.5 Flash (scene captioning) and Llama-3.3-70B (classification).',
      'Stateful session manager tracks activity transitions over time rather than judging single frames.',
      'OpenCV capture pipeline with a Streamlit interface.',
    ],
    stack: ['Python', 'Gemini 2.5 Flash', 'Llama-3.3-70B', 'OpenCV', 'Streamlit'],
  },
};

// Skills from master_profile.json (everything except items marked "drop").
// `core`: used in shipped work (experience/projects).
// `familiar`: studied in depth through coursework, GATE CS prep and self-learning.
export const skillGroups = [
  {
    title: 'Model optimization',
    core: ['Knowledge distillation', 'INT8 PTQ', 'Quantization-aware distillation', 'NF4 & mixed precision', 'GGUF / llama.cpp', 'ONNX Runtime', 'bitsandbytes', 'TFLite + NNAPI delegation'],
    familiar: [],
  },
  {
    title: 'Machine learning & deep learning',
    core: ['PyTorch', 'TensorFlow / Keras', 'HuggingFace Transformers', 'CNNs', 'Transfer learning & fine-tuning', 'CLIP', 'Pandas / NumPy'],
    familiar: ['scikit-learn', 'OpenCV'],
  },
  {
    title: 'GenAI & LLM systems',
    core: ['RAG', 'Vector search (Qdrant)', 'Prompt engineering', 'LLM APIs (Groq, Gemini, OpenRouter)', 'Whisper (ASR)', 'Structured / JSON output'],
    familiar: ['Agentic AI', 'LangChain', 'LangGraph'],
  },
  {
    title: 'Backend & distributed systems',
    core: ['FastAPI (async)', 'REST APIs', 'SSE streaming', 'OAuth2 / JWT', 'Redis (Streams, Lua)', 'PostgreSQL', 'MongoDB', 'Chrome Extensions (MV3)', 'Distributed systems', 'Concurrency & multithreading', 'System design'],
    familiar: ['SQLite'],
  },
  {
    title: 'DevOps, MLOps & cloud',
    core: ['Docker / Compose', 'GitHub Actions (CI/CD)', 'Prometheus / Grafana', 'MLflow', 'pytest', 'Linux', 'Git', 'Bash', 'HF Spaces · Render · Vercel'],
    familiar: ['AWS (Certified Cloud Practitioner)'],
  },
  {
    title: 'Languages',
    core: ['Python', 'C++', 'JavaScript', 'SQL'],
    familiar: ['Java', 'C'],
  },
  {
    title: 'CS fundamentals',
    core: ['Data structures & algorithms', 'OOP'],
    familiar: ['Operating systems', 'DBMS', 'Computer networks', 'Computer architecture', 'Theory of computation', 'Compiler design', 'Discrete mathematics'],
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
