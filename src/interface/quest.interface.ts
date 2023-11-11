import { Document } from 'mongoose';

export interface IQuest extends Document {
  readonly question: string;

  readonly options: Array<string>;

  readonly answerKey: number;
}
