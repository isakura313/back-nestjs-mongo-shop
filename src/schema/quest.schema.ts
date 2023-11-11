import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Quest {
  @Prop()
  question: string;

  @Prop()
  options: Array<string>;

  @Prop()
  answerKey: number;
}

export const QuestSchema = SchemaFactory.createForClass(Quest);
