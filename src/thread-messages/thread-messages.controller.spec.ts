import { Test, TestingModule } from '@nestjs/testing';
import { ThreadMessagesController } from './thread-messages.controller';

describe('ThreadMessagesController', () => {
  let controller: ThreadMessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreadMessagesController],
    }).compile();

    controller = module.get<ThreadMessagesController>(ThreadMessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
