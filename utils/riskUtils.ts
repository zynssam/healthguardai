import { RED_FLAG_KEYWORDS, LOCAL_OUTBREAKS } from '../constants';
import { RiskAssessment, RiskLevel, OutbreakData } from '../types';

export const analyzeRisk = (input: string): RiskAssessment => {
  const lowerInput = input.toLowerCase();
  const detectedFlags: string[] = [];

  // Check for red flags
  RED_FLAG_KEYWORDS.forEach(flag => {
    if (lowerInput.includes(flag)) {
      detectedFlags.push(flag);
    }
  });

  let level: RiskLevel = 'low';

  if (detectedFlags.length > 0) {
    level = 'high';
  } else {
    // Simple heuristic for moderate risk
    // Check for duration or severity keywords if no red flags
    const moderateKeywords = ['severe', 'worsening', 'high fever', 'weeks', 'chronic', 'unbearable'];
    const hasModerateFactors = moderateKeywords.some(kw => lowerInput.includes(kw));
    if (hasModerateFactors) {
      level = 'moderate';
    }
  }

  return { level, detectedFlags };
};

export const detectCity = (input: string): OutbreakData | null => {
  const lowerInput = input.toLowerCase();
  // Find if any supported city is mentioned in the input
  const outbreak = LOCAL_OUTBREAKS.find(o => lowerInput.includes(o.city.toLowerCase()));
  return outbreak || null;
};

export const extractDemographics = (input: string): { age?: string, gender?: string } => {
  const lowerInput = input.toLowerCase();
  let age: string | undefined;
  let gender: string | undefined;

  // Attempt to find age (e.g., "25", "25yo", "25 years old")
  // We look for a 1-2 digit number that is likely an age
  const ageMatch = input.match(/\b(\d{1,2})\s*(?:y|years|yrs|yo)?\b/i);
  if (ageMatch && ageMatch[1]) {
    // basic sanity check, ignore if it looks like a date or unrelated number
    const num = parseInt(ageMatch[1]);
    if (num > 0 && num < 110) {
        age = ageMatch[1];
    }
  }

  // Attempt to find gender
  if (/\b(male|man|boy|gentleman)\b/i.test(lowerInput)) gender = 'Male';
  else if (/\b(female|woman|girl|lady)\b/i.test(lowerInput)) gender = 'Female';
  else if (/\b(trans|non-binary)\b/i.test(lowerInput)) gender = 'Other';

  return { age, gender };
};