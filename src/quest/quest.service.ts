import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateQuestDto } from 'src/dto/create-quest.dto';
import { IQuest } from 'src/interface/quest.interface';
import { Model } from 'mongoose';
import { UpdateQuestDto } from 'src/dto/update-quest.dto';

@Injectable()
export class QuestService {
  constructor(@InjectModel('Quest') private questModel: Model<IQuest>) {}

  async createQuest(createQuestDto: CreateQuestDto): Promise<IQuest> {
    const newQuest = await new this.questModel(createQuestDto);
    return newQuest.save();
  }

  async updateQuest(
    questId: string,
    updateQuestDto: UpdateQuestDto,
  ): Promise<IQuest> {
    const existingQuest = await this.questModel.findByIdAndUpdate(
      questId,
      updateQuestDto,
      { new: true },
    );
    if (!existingQuest) {
      throw new NotFoundException(`Quest #${questId} not found`);
    }
    return existingQuest;
  }

  async getAllQuests(): Promise<IQuest[]> {
    const questData = await this.questModel.find();
    if (!questData || questData.length == 0) {
      throw new NotFoundException('Quests data not found!');
    }
    return questData;
  }
  async getAllCategories(): Promise<Array<string>> {
    const quests = await this.questModel.find();
    const answer = [];
    quests.forEach((quest) => {
      if (answer.includes(quest.division)) {
        return;
      } else {
        answer.push(quest.division);
      }
    });

    if (!quests || quests.length == 0) {
      throw new NotFoundException('quests data not found!');
    }
    return answer;
  }

  async getQuest(questId: string): Promise<IQuest> {
    const existingQuest = await this.questModel.findById(questId).exec();
    if (!existingQuest) {
      throw new NotFoundException(`Quest #${questId} not found`);
    }
    return existingQuest;
  }

  async getQuestByDivision(division: string): Promise<any> {
    const existingQuest = await this.questModel
      .find({ division: division })
      .exec();
    if (!existingQuest) {
      throw new NotFoundException(`Quest #${division} not found`);
    }
    return existingQuest;
  }

  async deleteQuest(questId: string): Promise<IQuest> {
    const deletedQuest = await this.questModel.findByIdAndDelete(questId);
    if (!deletedQuest) {
      throw new NotFoundException(`Quest #${questId} not found`);
    }
    return deletedQuest;
  }
}
