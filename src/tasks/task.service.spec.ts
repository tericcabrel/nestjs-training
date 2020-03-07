import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

const mockUser = { username : 'Test user' };

const mockTaskRepository = () => ({
  getTasks: jest.fn()
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

  describe('getTasks', function() {
    it('should gets all tasks from repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someValue');

      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      const filters: GetTasksFilterDto = { status: TaskStatus.OPEN, search: 'some search' };
      const  result = await tasksService.getTasks(filters, mockUser);

      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
