import { Test, TestingModule } from '@nestjs/testing';
import { ThreadMessagesService } from './thread-messages.service';

describe('ThreadMessagesService', () => {
  let service: ThreadMessagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThreadMessagesService],
    }).compile();

    service = module.get<ThreadMessagesService>(ThreadMessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
