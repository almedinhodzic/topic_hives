import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hive } from './hive.entity';
import { HivesController } from './hives.controller';
import { HivesService } from './hives.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hive])],
  controllers: [HivesController],
  providers: [HivesService],
})
export class HivesModule {}
