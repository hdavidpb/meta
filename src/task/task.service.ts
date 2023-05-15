import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { TaskRepository } from '../repositories/task.repository';
import { taskDTO, taskUpdateDTO } from 'src/dtos/task.dtos';

@Injectable()
export class TaskService {
  constructor(
    private UserRepository: UserRepository,
    private taskRepository: TaskRepository,
  ) {}

  async getAllTaksFromUser(userId: string) {
    const user = await this.UserRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('user do not exist');

    const tasks = await this.taskRepository.find({
      where: {
        user: user,
      },
    });

    if (!tasks) throw new NotFoundException('tasks do not exist');

    return {
      tasks,
      statusCode: HttpStatus.OK,
    };
  }

  async creteNewTask(userId: string, task: taskDTO) {
    const user = await this.UserRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('user do not exist');

    const taskInstace = this.taskRepository.create({
      user,
      description: task.description,
    });

    const savedTask = await this.taskRepository.save(taskInstace);

    const { user: profile, ...rest } = savedTask;
    return { task: rest, statusCode: HttpStatus.CREATED };
  }

  async updateTask(taskId: string, newTask: taskUpdateDTO) {
    const taskinstace = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (!taskinstace) throw new NotFoundException('Task not found');

    const taskUpdated = await this.taskRepository.save({
      ...taskinstace,
      description: newTask.description,
      isChecked: newTask.isChecked,
    });

    return { taskUpdated, statusCode: HttpStatus.OK };
  }

  async deleteTask(taskId: string) {
    const taskinstace = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (!taskinstace) throw new NotFoundException('Task not found');

    await this.taskRepository.delete(taskinstace.id);
    return taskinstace;
  }
}
