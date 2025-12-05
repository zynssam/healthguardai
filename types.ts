export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
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
