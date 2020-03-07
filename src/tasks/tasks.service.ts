import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository
  ) {

  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found!`);
    }

    return found;
  }

  /*private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks: Task[] = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task: Task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task: Task) =>
        task.title.includes(search) ||
        task.description.includes(search)
      );
    }

    return tasks;
  }

  deleteTask(id: string): void {
    const found: Task = this.getTaskById(id);

    this.tasks = this.tasks.filter((task: Task) => task.id != found.id);
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);

    task.status = status;

    return task;
  }*/
}
