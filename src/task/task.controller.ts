import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { taskDTO, taskUpdateDTO } from 'src/dtos/task.dtos';

@Controller('api/task')
export class TaskController {
  constructor(readonly taskService: TaskService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  getTasksAllTaksFromUser(@Request() res: any) {
    return this.taskService.getAllTaksFromUser(res.user.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  createTaks(@Request() res: any, @Body() task: taskDTO) {
    return this.taskService.creteNewTask(res.user.id, task);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  updateTask(
    @Param('id', ParseUUIDPipe) taskId: string,
    @Body() newTask: taskUpdateDTO,
  ) {
    return this.taskService.updateTask(taskId, newTask);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  deleteTask(@Param('id', ParseUUIDPipe) taskId: string) {
    return this.taskService.deleteTask(taskId);
  }
}
