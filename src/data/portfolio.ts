import {
  Brain,
  Cpu,
  Eye,
  ScanLine,
  Bot,
  Workflow,
  Server,
  Crosshair,
  type LucideIcon,
} from 'lucide-react';

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: 'Computer Vision Applications',
    description:
      'End-to-end vision systems for industrial and real-world use — from camera input to actionable decisions using detection, tracking, OCR and image analysis.',
    icon: Eye,
  },
  {
    title: 'Object Detection & Tracking',
    description:
      'Real-time detection and multi-object tracking pipelines that assign stable IDs, monitor motion and support counting, monitoring and production-line workflows.',
    icon: Crosshair,
  },
  {
    title: 'OCR & Barcode / QR Systems',
    description:
      'Label reading and validation pipelines using OCR, QR/barcode decoding and geometric corrections for automated product and document workflows.',
    icon: ScanLine,
  },
  {
    title: 'Machine Learning Solutions',
    description:
      'Practical ML pipelines for predictive analytics — data preparation, feature engineering, model training, evaluation and deployment.',
    icon: Brain,
  },
  {
    title: 'Deep Learning',
    description:
      'Custom and transfer-learning models in PyTorch and TensorFlow for classification, detection, segmentation and other vision-heavy tasks.',
    icon: Cpu,
  },
  {
    title: 'Generative AI & RAG',
    description:
      'Grounded LLM applications and retrieval-augmented systems over your documents using LangChain, FAISS and modern LLM APIs.',
    icon: Bot,
  },
  {
    title: 'AI Automation',
    description:
      'Automate repetitive visual and data workflows by combining vision, OCR, ML and APIs so teams focus on higher-value work.',
    icon: Workflow,
  },
  {
    title: 'FastAPI / AI Backend APIs',
    description:
      'High-performance REST APIs that serve ML and vision models with clean validation, documentation and production-minded architecture.',
    icon: Server,
  },
];

export type SkillCategory = {
  name: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  { name: 'Programming', skills: ['Python', 'JavaScript', 'HTML', 'CSS'] },
  { name: 'Machine Learning', skills: ['Scikit-learn', 'NumPy', 'Pandas'] },
  { name: 'Deep Learning', skills: ['PyTorch', 'TensorFlow'] },
  {
    name: 'Computer Vision',
    skills: ['YOLO', 'YOLO OBB', 'YOLO Segmentation', 'OpenCV', 'PaddleOCR', 'ZXing', 'SORT / Tracking'],
  },
  { name: 'Generative AI', skills: ['Gemini API', 'LangChain', 'FAISS', 'HuggingFace', 'RAG'] },
  { name: 'Backend', skills: ['FastAPI', 'Flask', 'Django'] },
  { name: 'Tools', skills: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Google Colab'] },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

export const experiences: Experience[] = [
  {
    company: 'Thingtrax',
    role: ' AI Engineer',
    period: 'Sep 2025 – Present',
    points: [
      'Developed industrial Computer Vision proof-of-concepts for manufacturing environments.',
      'Built object detection and multi-object tracking pipelines for real-time monitoring.',
      'Implemented OCR systems for automated label and text recognition.',
      'Developed customer-focused AI workflows for production-line requirements.',
      'Worked on AI solutions connecting vision systems with downstream analytics.',
    ],
  },
  {
    company: 'CodeAlpha',
    role: 'Data Science Intern',
    period: 'Jul 2024 – Aug 2024',
    points: [
      'Developed machine learning models for classification and regression tasks.',
      'Performed data analysis and visualization to extract actionable insights.',
      'Built reproducible Python notebooks for exploratory data analysis and reporting.',
    ],
  },
];

export type ProjectFilter =
  | 'All'
  | 'Computer Vision'
  | 'Machine Learning'
  | 'NLP / GenAI'
  | 'Full-Stack AI';

export type Project = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  filterCategory: Exclude<ProjectFilter, 'All'>;
  description: string;
  longDescription: string;
  tags: string[];
  technologies: string[];
  image?: string;
  video?: string;
  poster?: string;
  pipeline?: string[];
  overview: string;
  whatIBuilt: string[];
  technicalApproach: string;
  implementationDetails: string[];
  challenges: string[];
  results: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    id: 'label-validation',
    number: '01',
    title: 'Automated Label Validation System',
    tagline: 'Detect, read and validate product labels from video',
    category: 'Computer Vision · OCR · Object Detection',
    filterCategory: 'Computer Vision',
    featured: true,
    description:
      'Real-time computer vision system for detecting, reading and validating product label information from video.',
    longDescription:
      'A production-minded vision pipeline that detects product labels in video, extracts readable regions, applies geometric correction, then performs QR decoding and OCR before validating extracted values against expected rules.',
    tags: ['Python', 'YOLO', 'YOLO OBB', 'OpenCV', 'PaddleOCR', 'ZXing', 'NumPy'],
    technologies: ['Python', 'YOLO', 'YOLO OBB', 'OpenCV', 'PaddleOCR', 'ZXing', 'NumPy'],
    video: '/videos/label-validation.mp4',
    poster: '/images/projects/label-validation.jpg',
    image: '/images/projects/label-validation.jpg',
    pipeline: [
      'Video / Camera',
      'YOLO OBB Detection',
      'ROI Extraction',
      'Perspective Transformation',
      'QR Decoding / OCR',
      'Value Validation',
      'Pass / Fail Decision',
    ],
    overview:
      'Industrial and packaging workflows often need reliable label checks from live camera feeds. This system combines oriented object detection with OCR and QR decoding to validate label content in real time.',
    whatIBuilt: [
      'Oriented bounding-box detection for product labels in video streams',
      'ROI extraction and perspective transformation for readable crops',
      'QR decoding and OCR for structured and free-text label fields',
      'Rule-based validation that returns a clear pass / fail decision',
    ],
    technicalApproach:
      'The pipeline starts with YOLO OBB detection to locate labels under rotation and perspective distortion. Detected regions are cropped and geometrically corrected, then passed through ZXing for QR codes and PaddleOCR for text. Extracted values are validated against expected product rules.',
    implementationDetails: [
      'Used YOLO OBB to handle rotated and skewed labels on moving products',
      'Applied OpenCV-based perspective transforms before recognition',
      'Combined barcode/QR decoding with OCR for multi-format labels',
      'Structured the output as a validation decision suitable for downstream systems',
    ],
    challenges: [
      'Handling label rotation, glare and motion blur in live video',
      'Keeping OCR and QR decoding robust after ROI extraction',
      'Designing a validation step that stays interpretable for operators',
    ],
    results:
      'Delivered an end-to-end label validation workflow that connects detection, reading and decision-making into a single computer vision system suitable for industrial inspection scenarios.',
  },
  {
    id: 'object-counting',
    number: '02',
    title: 'Real-Time Object Counting & Tracking',
    tagline: 'Unique IDs and live object counts from video streams',
    category: 'Computer Vision · Object Detection · Tracking',
    filterCategory: 'Computer Vision',
    featured: true,
    description:
      'Real-time object detection and tracking system that assigns unique IDs and maintains a live object count from video streams.',
    longDescription:
      'A real-time vision system that detects objects frame by frame, extracts centroids, associates detections across time, and maintains unique IDs with a live running count.',
    tags: ['Python', 'YOLO', 'OpenCV', 'NumPy', 'Centroid Tracking'],
    technologies: ['Python', 'YOLO', 'OpenCV', 'NumPy', 'Centroid Tracking'],
    video: '/videos/object-counting.mp4',
    poster: '/images/projects/object-counting.jpg',
    image: '/images/projects/object-counting.jpg',
    pipeline: [
      'Video',
      'YOLO Detection',
      'Bounding Boxes',
      'Centroid Extraction',
      'Centroid Tracking',
      'Unique Object IDs',
      'Live Object Count',
    ],
    overview:
      'Counting moving objects reliably requires more than per-frame detection. This project pairs YOLO detections with centroid tracking so each object keeps a stable identity as it moves through the scene.',
    whatIBuilt: [
      'Frame-by-frame object detection on video input',
      'Centroid extraction from bounding boxes',
      'Centroid-based multi-object tracking with unique IDs',
      'Live object-count visualization over the video stream',
    ],
    technicalApproach:
      'YOLO produces bounding boxes each frame. Centroids are computed from those boxes and matched across frames using a centroid tracker, enabling persistent IDs and a live count without inventing complex multi-camera infrastructure.',
    implementationDetails: [
      'Ran YOLO detection on streaming video frames',
      'Derived centroids from detected boxes for association',
      'Tracked objects across frames to avoid double-counting',
      'Rendered IDs and live counts for operator-facing monitoring',
    ],
    challenges: [
      'Maintaining identity when objects briefly overlap or leave frame',
      'Balancing detection stability with real-time processing',
      'Avoiding inflated counts from repeated detections of the same object',
    ],
    results:
      'Produced a practical counting and tracking pipeline that turns raw detections into persistent object identities and a live count suitable for monitoring workflows.',
  },
  {
    id: 'segmentation-analysis',
    number: '03',
    title: 'Segmentation & Quality Analysis',
    tagline: 'Instance segmentation for automated visual quality checks',
    category: 'Computer Vision · Segmentation · Image Processing',
    filterCategory: 'Computer Vision',
    featured: true,
    description:
      'Instance segmentation combined with image processing to isolate objects and perform automated visual quality analysis.',
    longDescription:
      'A vision pipeline that uses YOLO segmentation to isolate objects, refines masks with image processing, extracts regions of interest, and analyzes pixel-level patterns for quality-related measurements such as fat-region detection and VL calculation.',
    tags: ['Python', 'YOLO Segmentation', 'OpenCV', 'NumPy', 'Image Processing'],
    technologies: ['Python', 'YOLO Segmentation', 'OpenCV', 'NumPy', 'Image Processing'],
    video: '/videos/segmentation-analysis.mp4',
    poster: '/images/projects/segmentation-analysis.jpg',
    image: '/images/projects/segmentation-analysis.jpg',
    pipeline: [
      'Video',
      'YOLO Segmentation',
      'Object Mask',
      'Mask Refinement',
      'Object Extraction',
      'Fat Region Detection',
      'Pixel Analysis',
      'VL Calculation',
    ],
    overview:
      'Quality analysis often depends on precise object boundaries rather than coarse boxes. This system uses instance segmentation and classical image processing to isolate objects and analyze visual regions of interest.',
    whatIBuilt: [
      'YOLO-based instance segmentation for object isolation',
      'Mask refinement and object extraction with OpenCV',
      'Region detection and pixel-level analysis for quality signals',
      'VL calculation from segmented visual evidence',
    ],
    technicalApproach:
      'YOLO segmentation produces object masks from video frames. Masks are refined and used to extract the object region. Image-processing steps then identify fat regions and support pixel analysis for VL calculation.',
    implementationDetails: [
      'Applied YOLO segmentation to obtain instance masks',
      'Refined masks before extracting the target object',
      'Used OpenCV and NumPy for region and pixel analysis',
      'Computed VL from the segmented quality-analysis workflow',
    ],
    challenges: [
      'Producing clean masks under variable lighting and texture',
      'Separating quality-relevant regions from background noise',
      'Keeping the analysis pipeline explainable for inspection use cases',
    ],
    results:
      'Built a segmentation-driven quality analysis workflow that isolates objects and supports visual measurements without relying on unverified accuracy claims.',
  },
  {
    id: 'breathe-safe',
    number: '04',
    title: 'Breathe Safe',
    tagline: 'AI-powered AQI Forecasting Web App',
    category: 'Machine Learning · Full-Stack AI',
    filterCategory: 'Machine Learning',
    description:
      'A web application that forecasts Air Quality Index (AQI) using time-series machine learning models, presenting location-aware predictions and health recommendations through a clean, responsive interface.',
    longDescription:
      'Breathe Safe combines time-series machine learning with a Flask web interface to forecast AQI and present accessible health-oriented guidance to users.',
    tags: ['Python', 'Scikit-learn', 'Time Series', 'Flask', 'Data Visualization'],
    technologies: ['Python', 'Scikit-learn', 'Time Series', 'Flask', 'Data Visualization'],
    image: '/images/projects/breathe-safe.jpg',
    githubUrl: 'https://github.com/mahnoor2410',
    overview:
      'Air quality decisions benefit from clear forecasts, not just raw sensor dumps. Breathe Safe turns historical and contextual signals into AQI predictions inside a usable web app.',
    whatIBuilt: [
      'Time-series machine learning models for AQI forecasting',
      'Data preparation and visualization for air-quality insights',
      'Flask-based web application for interactive predictions',
      'User-facing presentation of forecasts and health-oriented guidance',
    ],
    technicalApproach:
      'The project uses classical ML tooling for time-series forecasting, then wraps the model in a Flask application with visualization so predictions are easy to interpret.',
    implementationDetails: [
      'Prepared and explored air-quality related datasets',
      'Trained forecasting models with Scikit-learn',
      'Built a Flask frontend/backend for interactive use',
      'Presented forecasts with supporting data visualizations',
    ],
    challenges: [
      'Working with noisy real-world air-quality signals',
      'Presenting forecasts in a way non-experts can understand',
      'Connecting model outputs to a responsive product experience',
    ],
    results:
      'Delivered a full-stack ML application that demonstrates forecasting, visualization and practical product packaging of an environmental AI use case.',
  },
  {
    id: 'intellidoc-qa',
    number: '05',
    title: 'IntelliDoc QA',
    tagline: 'Multi-PDF RAG Chatbot',
    category: 'NLP / Generative AI · RAG',
    filterCategory: 'NLP / GenAI',
    description:
      'A retrieval-augmented chatbot that ingests multiple PDFs, indexes them with FAISS, and answers user questions grounded in the source documents with citations.',
    longDescription:
      'IntelliDoc QA is a grounded document Q&A system built with LangChain, FAISS and an LLM API so answers stay tied to the uploaded PDF corpus.',
    tags: ['LangChain', 'FAISS', 'RAG', 'Gemini API', 'Python'],
    technologies: ['LangChain', 'FAISS', 'RAG', 'Gemini API', 'Python'],
    image: '/images/projects/intellidoc-qa.jpg',
    githubUrl: 'https://github.com/mahnoor2410',
    overview:
      'Teams often need answers from their own documents instead of generic chatbot replies. IntelliDoc QA retrieves relevant PDF chunks and generates responses grounded in that context.',
    whatIBuilt: [
      'Multi-PDF ingestion and chunking pipeline',
      'FAISS-based vector indexing for retrieval',
      'RAG orchestration with LangChain and Gemini API',
      'Grounded question answering over private document sets',
    ],
    technicalApproach:
      'Documents are split and embedded into a FAISS index. At query time, relevant chunks are retrieved and passed to an LLM through a LangChain RAG flow so responses stay context-aware.',
    implementationDetails: [
      'Ingested and chunked multiple PDF sources',
      'Indexed embeddings with FAISS for fast retrieval',
      'Connected retrieval to Gemini via LangChain',
      'Returned answers grounded in retrieved document context',
    ],
    challenges: [
      'Chunking documents so retrieval stays relevant',
      'Reducing hallucinations by grounding answers in source context',
      'Keeping the RAG flow simple enough to extend later',
    ],
    results:
      'Created a practical RAG chatbot that demonstrates private-document Q&A with retrieval grounding rather than unconstrained generation.',
  },
  {
    id: 'ai-job-portal',
    number: '06',
    title: 'AI Job Portal',
    tagline: 'Resume Screening using Gemini AI',
    category: 'NLP / Generative AI · Full-Stack AI',
    filterCategory: 'Full-Stack AI',
    description:
      'A job portal that screens resumes against job descriptions using the Gemini API, ranking candidates by semantic match and surfacing shortlisted profiles to recruiters.',
    longDescription:
      'AI Job Portal uses generative AI to compare resumes with job descriptions, helping recruiters shortlist candidates through semantic matching instead of brittle keyword filters alone.',
    tags: ['Gemini API', 'NLP', 'Python', 'FastAPI', 'Generative AI'],
    technologies: ['Gemini API', 'NLP', 'Python', 'FastAPI', 'Generative AI'],
    image: '/images/projects/ai-job-portal.jpg',
    githubUrl: 'https://github.com/mahnoor2410',
    overview:
      'Manual resume screening is slow and inconsistent. This project applies Gemini-powered semantic matching to compare candidate materials with role requirements and surface stronger shortlists.',
    whatIBuilt: [
      'Resume-to-job-description screening flow with Gemini AI',
      'Semantic matching for candidate ranking',
      'FastAPI backend to serve the screening workflow',
      'Recruiter-facing shortlist presentation of matched profiles',
    ],
    technicalApproach:
      'The system sends resume and job-description context to the Gemini API for semantic comparison, then exposes the screening workflow through a FastAPI service for practical product use.',
    implementationDetails: [
      'Designed an NLP screening flow around Gemini API calls',
      'Compared resumes against role requirements semantically',
      'Served the workflow through FastAPI',
      'Organized outputs into recruiter-friendly shortlists',
    ],
    challenges: [
      'Handling varied resume formats and noisy text',
      'Keeping matching useful beyond simple keyword overlap',
      'Packaging generative AI inside a maintainable API workflow',
    ],
    results:
      'Built a full-stack AI screening application that shows how generative models can support recruiter workflows with semantic resume matching.',
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  return projects.filter((p) => p.id !== project.id && p.filterCategory === project.filterCategory).slice(0, limit);
}
