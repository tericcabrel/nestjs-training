import { EntityRepository, Repository } from 'typeorm';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {

}
