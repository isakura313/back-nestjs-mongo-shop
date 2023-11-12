import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
  Query,
  Logger,
} from '@nestjs/common';
import { CreateQuestDto } from 'src/dto/create-quest.dto';
import { UpdateQuestDto } from 'src/dto/update-quest.dto';
import { QuestService } from 'src/quest/quest.service';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createQuest(@Res() response, @Body() createQuestDto: CreateQuestDto) {
    try {
      const newQuest = await this.questService.createQuest(createQuestDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Quest has been created successfully',
        newQuest,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Quest not created!',
        error: 'Bad Request',
      });
    }
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  async updateQuest(
    @Res() response,
    @Param('id') questId: string,
    @Body() updateQuestDto: UpdateQuestDto,
  ) {
    try {
      const existingQuest = await this.questService.updateQuest(
        questId,
        updateQuestDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Quest has been successfully updated',
        existingQuest,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getQuests(@Res() response) {
    try {
      const questData = await this.questService.getAllQuests();
      return response.status(HttpStatus.OK).json({
        message: 'All quest data found successfully',
        questData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getQuest(@Res() response, @Param('id') questId: string) {
    try {
      const existingQuest = await this.questService.getQuest(questId);
      return response.status(HttpStatus.OK).json({
        message: 'Quest found successfully',
        existingQuest,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/api/filters')
  async getQuestByDivision(@Res() response, @Query('division') division) {
    try {
      const existingQuest = await this.questService.getQuestByDivision(
        division,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Quest found successfully',
        existingQuest,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/api/categories')
  async getCategory(@Res() response) {
    try {
      const existingQuest = await this.questService.getAllCategories();
      return response.status(HttpStatus.OK).json({
        message: 'Categories found successfully',
        existingQuest,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async deleteQuest(@Res() response, @Param('id') questId: string) {
    try {
      const deletedQuest = await this.questService.deleteQuest(questId);
      return response.status(HttpStatus.OK).json({
        message: 'Quest deleted successfully',
        deletedQuest,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
