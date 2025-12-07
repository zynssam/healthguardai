export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isRiskWarning?: boolean; // New field to identify injected warnings
}

export enum ViewState {
  HOME = 'HOME',
  CHAT = 'CHAT',
  DASHBOARD = 'DASHBOARD',
  ABOUT = 'ABOUT'
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export type RiskLevel = 'low' | 'moderate' | 'high';

export interface RiskAssessment {
  level: RiskLevel;
  detectedFlags: string[];
}

export interface OutbreakData {
  city: string;
  diseaseName: string;
  riskLevel: RiskLevel;
  activeCases: number;
  trend: 'rising' | 'falling' | 'stable';
}

export interface SessionSummary {
  age?: string;
  gender?: string;
  likelyCondition?: string;
  riskLevel: RiskLevel;
  keySymptoms: string[];
  advice?: string;
}