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
    'SolidWorks CAD',
    '3D Printed Enclosure',
  ],
};

export const funding =
  'Fully funded by the Direktorat Penelitian dan Pengabdian kepada Masyarakat (PPM), Telkom University';

export type OutcomeStatus = 'done' | 'pending';

export interface Outcome {
  kind: string;
  title: string;
  venue: string;
  status: string;
  state: OutcomeStatus;
  href?: string;
  linkLabel?: string;
}

export const outcomes: Outcome[] = [
  {
    kind: 'Conference paper',
    title: 'Adaptive Blink Detection Using MediaPipe FaceMesh and Sigmoid-Based Eye-Closure Scoring Under Low-Light Conditions',
    venue: 'EECSI 2026, Yogyakarta',
    status: 'Presented',
    state: 'done',
    href: '#certificates',
    linkLabel: 'View certificate',
  },
  {
    kind: 'Copyright registration',
    title: 'Rumeksa: infrared-camera, Edge-AI driver drowsiness detection device',
    venue: 'Directorate General of Intellectual Property, Indonesia',
    status: 'Registered',
    state: 'done',
    href: 'https://hakcipta.dgip.go.id/legal/c/MDAxNDc0MjEw',
    linkLabel: 'Verify registration',
  },
  {
    kind: 'Journal article',
    title: 'Multi-Signal Rule-Based Driver Drowsiness Detection Across Heterogeneous Real-World Datasets',
    venue: 'JNTETI, SINTA 2',
    status: 'Minor revision submitted, awaiting final decision',
    state: 'pending',
  },
  {
    kind: 'Patent',
    title: 'Drowsiness detection alert: edge computer-vision fatigue alert on Raspberry Pi with infrared imaging at 0 lux',
    venue: 'Patent application, Indonesia',
    status: 'Awaiting acceptance',
    state: 'pending',
  },
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

const H = '/final-project/hud/';
const P = '/final-project/prototype/';
const D = '/final-project/design/';

/** One slide per category for the intro carousel (also its lightbox order). */
export const featuredGallery: PhotoContext[] = [
  { url: `${P}camera.webp`, caption: 'Prototype: the Raspberry Pi camera with its infrared illuminators glowing, on a 3D-printed enclosure.', tools: 'Raspberry Pi camera with IR module' },
  { url: `${H}yawn.webp`, caption: 'Runtime HUD: yawn detected (MENGUAP) at 0 lux. Live EAR, MAR and pitch, thresholds, PERCLOS, status and history graphs. Faces are blurred for privacy.', tools: 'Raspberry Pi 5 runtime HUD, 0 lux' },
  { url: `${D}isometric.webp`, caption: '3D design: isometric CAD render of the enclosure.', tools: 'CAD' },
  { url: `${D}schematic.webp`, caption: 'Schematic: Raspberry Pi 5 8GB, camera with IR module, Li-ion pack with BMS, step-up and buck converters, speaker and push button.', tools: 'System schematic' },
  { url: `${P}defense.webp`, caption: 'Thesis defense at Telkom University.', tools: 'Final project defense' },
];

export const methodGallery: PhotoContext[] = [
  { url: '/final-project/method/flowchart.webp', caption: 'Full system flowchart: initialization, calibration, monitoring loop, event detection, accumulator, scoring and alerts.', tools: 'System flowchart' },
];
