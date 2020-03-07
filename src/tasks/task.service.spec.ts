import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import mock = jest.mock;
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 12, username : 'Test user' };

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository }
      ]
    }).compile();

    tasksService = await module.get<TasksService>('TasksService');
    taskRepository = await module.get<TaskRepository>('TaskRepository');
  });

  describe('getTasks', () => {
    it('should gets all tasks from repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filters: GetTasksFilterDto = { status: TaskStatus.OPEN, search: 'some search' };
      const  result = await tasksService.getTasks(filters, mockUser);

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('should calls taskRepository.findOne() and successfully retrieve and return the task', async () => {
      const mockTask = { title: 'Task title', description: 'Test desc' };

      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById(1, mockUser);

      expect(result).toEqual(mockTask);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: mockUser.id
        }
      });
    });

    it('should throws an error as task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);

      expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});
