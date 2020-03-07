import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'develop',
  password: 'suprageek95',
  database: 'taskman',
  entities: [__dirname + '/../**/*/.entity.ts'],
  synchronize: true, // Not recommend in production
};

