import { Test, TestingModule } from '@nestjs/testing';
import { CompilerController } from './compiler.controller';
import { CompilerService } from './compiler.service';
import {
  CreateCompilerDto,
  CreateCompilerResponseDto,
  GetCompilerDto,
} from './dto/compiler.dto';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('CompilerController', () => {
  let controller: CompilerController;
  let service: CompilerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CompilerController],
      providers: [CompilerService],
    }).compile();

    controller = module.get<CompilerController>(CompilerController);
    service = module.get<CompilerService>(CompilerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createSubmission => should create new compiler and return its ID', async () => {
    const createCompilerDto: CreateCompilerDto = {
      compilerId: 12,
      source: "console.log('test')",
    };

    const response: CreateCompilerResponseDto = {
      id: '2184yhf9i9uuh38291g7dh8f9202',
    };

    jest
      .spyOn(service, 'createSubmission')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));

    const result = await service.createSubmission(
      createCompilerDto,
      'fakeToken',
    );

    expect(service.createSubmission).toHaveBeenCalled();
    expect(service.createSubmission).toHaveBeenCalledWith(
      createCompilerDto,
      'fakeToken',
    );

    expect(result).toEqual(response);
  });

  it('getSubmission => should return submission by ID', async () => {
    const submissionId = '2184yhf9i9uuh38291g7dh8f9202';
    const submission: GetCompilerDto = {
      id: 1,
      executing: false,
      date: '02.12.2022',
      compiler: null,
      result: null,
    };

    jest
      .spyOn(service, 'getSubmission')
      .mockImplementation(() => new Promise((resolve) => resolve(submission)));

    const result = await controller.getSubmission(submissionId, 'fakeToken');

    expect(service.getSubmission).toHaveBeenCalledWith(
      submissionId,
      'fakeToken',
    );
    expect(result).toEqual(submission);
  });
});
