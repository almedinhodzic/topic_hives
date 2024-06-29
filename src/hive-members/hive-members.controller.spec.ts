import { Test, TestingModule } from '@nestjs/testing';
import { HiveMembersController } from './hive-members.controller';

describe('HiveMembersController', () => {
  let controller: HiveMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HiveMembersController],
    }).compile();

    controller = module.get<HiveMembersController>(HiveMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
