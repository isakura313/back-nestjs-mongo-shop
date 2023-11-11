import { IsNotEmpty } from 'class-validator';

export class CreateQuestDto {
  @IsNotEmpty()
  readonly question: string;

  @IsNotEmpty()
  readonly options: Array<string>;

  @IsNotEmpty()
  readonly answerKey: number;
}
