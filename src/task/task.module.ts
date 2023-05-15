import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from 'src/repositories/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, TaskRepository])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
