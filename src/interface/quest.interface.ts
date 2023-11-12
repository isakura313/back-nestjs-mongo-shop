import { Document } from 'mongoose';

export interface IQuest extends Document {
  readonly division: string;
  
  readonly question: string;

  readonly options: Array<string>;

  readonly answerKey: number;
}
