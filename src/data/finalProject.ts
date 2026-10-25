import type { PhotoContext } from '../types';

export const finalProject = {
  title: 'Driver Fatigue Detection on Facial Features Using Edge-AI in Low-Light Conditions with Infrared Camera',
  degree: 'Bachelor of Electrical Engineering, Telkom University',
  repoUrl: 'https://github.com/athifatharmn06/ta-deteksi-kelelahan',
  summary:
    'A real-time driver drowsiness monitor that runs entirely on a Raspberry Pi 5 with an infrared camera, so it keeps working in complete darkness. MediaPipe FaceMesh landmarks become four signals (eye aspect ratio, mouth aspect ratio, head pitch and PERCLOS), which a rule-based state machine fuses into a weighted drowsiness score with multi-level audio alerts. No GPU and no training data required.',
  tags: [
    'Raspberry Pi 5',
    'IR Camera (Noir)',
    'MediaPipe FaceMesh',
    'OpenCV',
    'Python',
    'EAR / MAR / PERCLOS',
    'State Machine',
    '3D Printed Enclosure',
  ],
};

export const finalProjectStats = [
  { value: 30, suffix: '', label: 'FPS on-device', note: 'CPU only, no GPU or TPU' },
  { value: 23, suffix: ' ms', label: 'End-to-end latency', note: 'Mean across 12 sessions' },
  { value: 33, suffix: '%', label: 'CPU load', note: 'Raspberry Pi 5, ~45°C SoC' },
  { value: 0, suffix: ' lux', label: 'Tested in darkness', note: 'Infrared illumination' },
];

export const pipelineSteps = [
  { title: 'Camera', detail: 'The Raspberry Pi camera with infrared illuminators streams frames at about 30 FPS, in daylight or total darkness.' },
  { title: 'FaceMesh', detail: 'MediaPipe FaceMesh extracts 478 facial landmarks from each frame on the CPU.' },
  { title: 'Metrics', detail: 'Eye aspect ratio, mouth aspect ratio, head pitch and PERCLOS are computed from the landmarks.' },
  { title: 'Calibration', detail: 'A physical push button (GPIO 26) records a per-driver baseline so thresholds adapt to each face.' },
  { title: 'Events', detail: 'Temporal rules detect blinks, microsleeps, yawns and head drops, with guards against oscillation and talking.' },
  { title: 'Accumulator', detail: 'A fatigue accumulator adds weight for sustained events and decays over time, so one noisy frame never triggers an alarm.' },
  { title: 'Score', detail: 'Ocular, oral and postural signals are fused into one weighted drowsiness score and mapped to alert levels.' },
  { title: 'Alert', detail: 'An audio manager plays level-based voice warnings and an alarm through the speaker.' },
];

export const eventScores = [
  { event: 'Blink', f1: 0.8 },
  { event: 'Microsleep', f1: 0.842 },
  { event: 'Yawn', f1: 0.934 },
  { event: 'Head-down', f1: 0.85 },
];

export interface ResultTab {
  id: string;
  label: string;
  image: string;
  caption: string;
  insight: string;
}

const R = '/final-project/results/';

export const resultTabs: ResultTab[] = [
  {
    id: 'accuracy',
    label: 'Accuracy',
    image: `${R}f1-per-event.webp`,
    caption: 'Precision, recall and F1 per fatigue indicator',
    insight: 'Across 6 subjects and 12 sessions the system reaches F1 scores of 0.800 (blink), 0.842 (microsleep), 0.934 (yawn) and 0.850 (head-down), with zero false positives for microsleep.',
  },
  {
    id: 'light',
    label: 'Bright vs 0 lux',
    image: `${R}bright-vs-dark.webp`,
    caption: 'F1 score in normal light compared with complete darkness',
    insight: 'Infrared sensing keeps detection steady in the dark. Yawn detection even improves from 0.909 in normal light to 0.964 at 0 lux.',
  },
  {
    id: 'latency',
    label: 'Latency',
    image: `${R}latency.webp`,
    caption: 'End-to-end latency across all sessions',
    insight: 'Mean latency stays near 23 ms, far below the 50 ms target and inside the 33 ms budget of a 30 FPS stream.',
  },
  {
    id: 'load',
    label: 'CPU & heat',
    image: `${R}resources.webp`,
    caption: 'Raspberry Pi 5 CPU load and SoC temperature',
    insight: 'About one third of the CPU and roughly 45°C SoC temperature, so the unit stays cool during long sessions.',
  },
];

const P = '/final-project/prototype/';
const D = '/final-project/design/';

/** Photos and drawings shown in the hardware gallery. Order matters: it is the lightbox order. */
export const hardwareGallery: (PhotoContext & { span?: string })[] = [
  { url: `${P}camera.webp`, caption: 'The prototype with the Raspberry Pi camera and its infrared illuminators glowing, mounted on a 3D-printed enclosure.', tools: 'Raspberry Pi camera with IR module' },
  { url: `${P}internals.webp`, caption: 'Inside the enclosure: Raspberry Pi 5, wiring, speaker and battery pack.', tools: 'Raspberry Pi 5, Li-ion pack' },
  { url: `${P}side.webp`, caption: 'Side panel with the calibration push button, USB port and power switch.', tools: 'GPIO 26 calibration button' },
  { url: `${P}top.webp`, caption: 'Top view of the printed enclosure with hexagonal ventilation holes and the adjustable camera mount.', tools: '3D printed, ventilated' },
  { url: `${P}internals-top.webp`, caption: 'Component layout under the lid.', tools: 'Raspberry Pi 5, power chain' },
  { url: `${D}isometric.webp`, caption: 'Isometric CAD render of the enclosure.', tools: 'CAD' },
  { url: `${D}cad-views.webp`, caption: 'Orthographic CAD views of the enclosure parts.', tools: 'CAD' },
  { url: `${D}drawing.webp`, caption: '2D technical drawings of the printed parts.', tools: '2D technical drawing' },
  { url: `${D}schematic.webp`, caption: 'Full system schematic: Raspberry Pi 5 8GB, camera with IR module, Li-ion pack with BMS, step-up and buck converters, speaker and push button.', tools: 'System schematic' },
  { url: `${P}defense.webp`, caption: 'Thesis defense at Telkom University.', tools: 'Final project defense' },
];

export const methodGallery: PhotoContext[] = [
  { url: '/final-project/method/flowchart.webp', caption: 'Full system flowchart: initialization, calibration, monitoring loop, event detection, accumulator, scoring and alerts.', tools: 'System flowchart' },
  { url: `${R}ear-sigmoid.webp`, caption: 'Adaptive EAR threshold and sigmoid eye-closure score on a blink sequence (from the EECSI 2026 paper).', tools: 'EAR, sigmoid scoring' },
  { url: `${R}subject-heatmap.webp`, caption: 'Subject-by-subject F1 map across fatigue events and lighting conditions.', tools: 'Per-subject evaluation' },
  { url: `${R}pareto.webp`, caption: 'Weight ablation: recall against false positives for the candidate score weightings, with the chosen setting marked.', tools: 'Weight ablation' },
];
