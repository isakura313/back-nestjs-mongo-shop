import { IS_NOT_EMPTY, IsNotEmpty } from 'class-validator';

export class CreateQuestDto {
  @IsNotEmpty()
  readonly division: string;

  @IsNotEmpty()
  readonly question: string;

  @IsNotEmpty()
  readonly options: Array<string>;

  @IsNotEmpty()
  readonly answerKey: number;
}
