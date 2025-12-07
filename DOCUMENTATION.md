# HealthGuard AI: Technical Architecture & System Documentation

**Project:** AI-Driven Public Health Chatbot  
**Authors:** Samrudh Shetty, Suraj Mahesh  
**Faculty Incharge:** Prof. Anand Shankar  
**Version:** 1.0.5 (Prototype with Risk Engine)

---

## 1. System Overview

HealthGuard AI is a Single Page Application (SPA) designed to simulate a triage doctor and public health dashboard. The system architecture follows a **Client-Service-AI** model, where the frontend communicates directly with a Large Language Model (LLM) API to generate dynamic responses, utilizing a local **Risk Engine** to ensure patient safety before the query even reaches the AI.

### High-Level Architecture
*   **Frontend:** React.js (Component-based UI)
*   **Intelligence Layer:** Google Gemini API (`gemini-2.5-flash` model)
*   **Safety Layer:** Local Regex-based Risk Engine & Demographics Extractor
*   **State Management:** React `useState` & `useEffect` hooks

---

## 2. Updated Interaction Logic

The core chatbot flow has been enhanced to be more clinically accurate by enforcing demographics intake and safety checks.

### Phase 0: Triage & Demographics
Before any symptom analysis begins, the system now enforces a "Patient Details" step.
*   **Why?** Medical advice for a 5-year-old varies drastically from a 70-year-old.
*   **Implementation:** 
    *   The `ChatInterface` initializes by asking for **Age** and **Gender**.
    *   The `extractDemographics` utility parses these details from the user's natural language input (e.g., "I am 25 male") and populates the **Health Summary Card** immediately.

### Phase 1: Risk Assessment (The Safety Net)
Every user message passes through a local **Risk Engine** (`utils/riskUtils.ts`) before being sent to the AI.
1.  **Red Flag Detection:** The system scans for keywords like "chest pain", "shortness of breath", "paralysis".
2.  **Logic:** 
    *   If **High Risk** is detected: A visual **WARNING BANNER** is triggered immediately in the UI. A strict "Emergency Protocol" prompt is injected into the AI context to prevent false reassurance.
    *   If **Moderate Risk** is detected: The AI is instructed to ask more clarifying questions about severity.
    *   If **Low Risk**: Standard diagnostic flow proceeds.

### Phase 2: Local Outbreak Context
The system now includes a mock "Public Health Intelligence" layer.
*   **Function:** If the user mentions a supported city (e.g., "Bangalore", "Mumbai"), the system retrieves active outbreak data (e.g., "Rising Dengue Cases").
*   **Context Injection:** This data is transparently passed to the AI so it can tailor its diagnosis (e.g., "Since you are in Bangalore where Dengue is rising, do you have a rash?").

---

## 3. Frontend Architecture

### A. New Components
1.  **`HealthSummaryCard.tsx`**: 
    *   A persistent UI card on the sidebar.
    *   Displays: Patient Age/Gender, Calculated Risk Level, and the AI's "Pinpointed Condition" in real-time.
2.  **`Flowchart.tsx`**: 
    *   Updated to visualize the "Risk Engine" and "Demographics Extraction" logic nodes.

### B. Styling Strategy
We continue to use **Tailwind CSS** with a `Teal` (Medical) and `Slate` (Text) palette. The new "High Risk" state introduces a `Red` alert theme to grab attention.

---

## 4. Backend & AI Logic (The Brain)

### A. The Service Layer (`services/geminiService.ts`)
Updated to support **Context Injection**.
*   The `sendMessageToGemini` function now accepts a `context` string.
*   This allows us to silently prepend instructions like "URGENT: User has chest pain. Recommend ER." without the user seeing it in their chat bubble.

### B. Prompt Engineering (`constants.ts`)
The **System Instruction** has been updated to include **Phase 0 (Demographics)** as a mandatory step.
*   *Old:* "Ask symptoms."
*   *New:* "Ensure you know Age/Gender first. Then ask symptoms."

---

## 5. Data Flow Lifecycle (Detailed)

1.  **Initialization:** Chatbot asks "Please provide Age and Gender".
2.  **Input:** User types "25 Male, I have a headache".
3.  **Local Processing:** 
    *   `extractDemographics` finds "25" and "Male". Updates Summary Card.
    *   `analyzeRisk` scans for "headache" (Low/Moderate risk).
4.  **API Call:** 
    *   System sends prompt: `[PATIENT: Age 25, Gender Male] 25 Male, I have a headache` to Gemini.
5.  **AI Response:** Gemini uses the age/gender context to ask relevant follow-up questions.

---

## 6. Directory Structure

*   **`utils/riskUtils.ts`**: **(NEW)** Contains logic for parsing age, gender, and risk keywords.
*   **`components/HealthSummaryCard.tsx`**: **(NEW)** Visual summary component.
*   **`constants.ts`**: Updated with Red Flag keywords and Outbreak data.
*   **`services/geminiService.ts`**: Updated API service.

---

## 7. Future Scope

1.  **Integration with Wearables:** Fetch heart rate data directly.
2.  **Multilingual Support:** Allow the AI to switch languages based on user input.
3.  **Geo-Location API:** Auto-detect city for outbreak alerts.
