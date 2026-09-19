export interface HistoryMilestone {
  key: string;
  year: string;
}

export interface HistoryChapter {
  key: string;
  image: string;
}

export const historyMilestones: HistoryMilestone[] = [
  { key: 'm2020', year: '2020' },
  { key: 'm2022', year: '2022' },
  { key: 'm2024', year: '2024' },
  { key: 'm2026', year: '2026' },
];

export const historyChapters: HistoryChapter[] = [
  { key: 'origin', image: 'history/1.jpg' },
  { key: 'growth', image: 'history/2.jpg' },
  { key: 'forest', image: 'history/3.jpg' },
  { key: 'present', image: 'history/4.jpg' },
];
