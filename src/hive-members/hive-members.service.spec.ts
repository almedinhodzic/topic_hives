import { Test, TestingModule } from '@nestjs/testing';
import { HiveMembersService } from './hive-members.service';

describe('HiveMembersService', () => {
  let service: HiveMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HiveMembersService],
    }).compile();

    service = module.get<HiveMembersService>(HiveMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
