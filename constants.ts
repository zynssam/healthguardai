import { ChartDataPoint, OutbreakData } from './types';

export const SYSTEM_INSTRUCTION = `You are HealthGuard AI, acting as an Advanced Clinical Diagnostic Prototype.

CORE DIRECTIVE:
Your goal is to perform a differential diagnosis. You must interactively question the user to gather specific clinical details and then pinpoint the ONE SINGLE most probable disease or condition.

OPERATIONAL PROTOCOL:

1. **Phase 0: Triage & Demographics (MANDATORY START)**
   - You MUST ensure you know the patient's **Age** and **Gender** before making any medical assessment.
   - If the user has not provided this, ASK for it immediately. (e.g., "Before we proceed, please provide your age and gender so I can assess you accurately.")
   - This distinguishes pediatric cases from adult/geriatric cases.

2. **Phase 1: History Taking (The Questioning Loop)**
   - If the user provides a vague symptom (e.g., "I have a stomach ache"), DO NOT guess immediately.
   - Ask 2-3 targeted, professional medical questions to distinguish between causes (e.g., "Is the pain sharp or dull? Is it localized to the lower right side? Do you have a fever?").
   - Keep questions concise and clinical.

3. **Phase 2: The Assessment (The Pinpoint)**
   - Once you have sufficient information (usually after 1-3 rounds of questioning), provide a definitive assessment.
   - You MUST select the single most likely cause based on the symptoms provided.
   - Use the format: "Based on the clinical presentation, the most likely condition is **[Specific Disease Name]**."

4. **Phase 3: Management Plan**
   - Briefly explain *why* this diagnosis fits (e.g., "The combination of X and Y rules out Z").
   - Provide immediate, actionable advice (e.g., "Hydrate immediately," "Monitor temperature").

SAFETY & RED FLAGS:
- If symptoms indicate a medical emergency (Heart Attack, Stroke, Anaphylaxis, Severe Bleeding), STOP questioning immediately and instruct the user to call Emergency Services (911).

MANDATORY DISCLAIMER:
- End every diagnostic conclusion with: "⚠️ Note: This is an AI prototype assessment and does not constitute a formal medical diagnosis. Please consult a healthcare professional."

Tone: Clinical, Precise, Authoritative, yet Empathetic.`;

export const MOCK_QUERY_STATS: ChartDataPoint[] = [
  { name: 'Influenza', value: 400 },
  { name: 'COVID-19', value: 300 },
  { name: 'Dengue', value: 200 },
  { name: 'Allergies', value: 150 },
  { name: 'Migraine', value: 100 },
];

export const MOCK_RISK_DISTRIBUTION: ChartDataPoint[] = [
  { name: 'Low Risk', value: 60 },
  { name: 'Moderate Risk', value: 30 },
  { name: 'High Risk', value: 10 },
];

export const FEATURES_LIST = [
  {
    title: "Verified Knowledge Base",
    description: "Stores reliable health data to ensure trustworthy and up-to-date information.",
    icon: "Database"
  },
  {
    title: "AI-Driven Response",
    description: "Analyzes natural language queries to provide accurate, relevant answers instantly.",
    icon: "Bot"
  },
  {
    title: "Visual Dashboard",
    description: "Displays prevention guidelines and local health alerts for better public awareness.",
    icon: "LayoutDashboard"
  },
  {
    title: "24/7 Availability",
    description: "Automated delivery of health information anytime, anywhere.",
    icon: "Clock"
  }
];

// --- NEW DATASETS ---

export const LOCAL_OUTBREAKS: OutbreakData[] = [
  { city: 'Bangalore', diseaseName: 'Gastroenteritis', riskLevel: 'moderate', activeCases: 120, trend: 'rising' },
  { city: 'Mumbai', diseaseName: 'Seasonal Influenza', riskLevel: 'low', activeCases: 450, trend: 'stable' },
  { city: 'Delhi', diseaseName: 'Dengue Fever', riskLevel: 'high', activeCases: 890, trend: 'rising' },
  { city: 'New York', diseaseName: 'COVID-19 (Variant X)', riskLevel: 'moderate', activeCases: 2100, trend: 'falling' },
  { city: 'London', diseaseName: 'Whooping Cough', riskLevel: 'high', activeCases: 300, trend: 'rising' },
];

export const RED_FLAG_KEYWORDS = [
  "chest pain", "pressure in chest", "crushing pain",
  "difficulty breathing", "shortness of breath", "can't breathe", "gasping",
  "sudden weakness", "paralysis", "slurred speech", "drooping face",
  "severe headache", "worst headache", "neck stiffness",
  "confusion", "loss of consciousness", "passed out", "fainted",
  "suicide", "kill myself", "end my life", "self-harm",
  "blood in vomit", "coughing blood", "black stool"
];