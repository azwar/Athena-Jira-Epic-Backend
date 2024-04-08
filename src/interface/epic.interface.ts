export interface IEpic {
  id: number;
  summary: string;
  description: string;
  creator: {
    accountId: string;
    displayName: string;
  };
  created: string;
  updated: string;
}
