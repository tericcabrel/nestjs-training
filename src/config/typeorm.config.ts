import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'develop',
  password: 'suprageek95',
  database: 'taskman',
  entities: [__dirname + '/../**/*.entity.js'],
  synchronize: true, // Not recommended in production
};

