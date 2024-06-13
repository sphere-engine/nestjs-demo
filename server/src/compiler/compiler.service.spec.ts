import { Test, TestingModule } from '@nestjs/testing';
import { CompilerService } from './compiler.service';
import {
  CreateCompilerDto,
  CreateCompilerResponseDto,
  GetCompilerDto,
} from './dto/compiler.dto';
import { HttpModule, HttpService } from '@nestjs/axios';
import { throwError } from 'rxjs';
import { NotFoundException } from '@nestjs/common';

describe('CompilerService', () => {
  let service: CompilerService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CompilerService],
    }).compile();

    service = module.get<CompilerService>(CompilerService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createSubmission => should return promise', async () => {
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

  it('getSubmission => should return promise with object', async () => {
    const id: string = '1';
    const response: GetCompilerDto = {
      id: 1,
      executing: false,
      date: '02.12.2022',
      compiler: null,
      result: null,
    };

    jest
      .spyOn(service, 'getSubmission')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));

    const result = await service.getSubmission(id, 'fakeToken');

    expect(service.getSubmission).toHaveBeenCalledWith(id, 'fakeToken');
    expect(result).toEqual(response);
  });

  it('createSubmission => should throw NotFoundException', async () => {
    const createCompilerDto: CreateCompilerDto = {
      compilerId: 1,
      source: "console.log('test')",
    };

    jest
      .spyOn(httpService, 'post')
      .mockReturnValueOnce(throwError(() => new Error('Error')));

    await expect(
      service.createSubmission(createCompilerDto, 'fakeToken'),
    ).rejects.toThrow(NotFoundException);
  });

  it('getSubmission => should throw NotFoundException', async () => {
    const id: string = '1';

    jest
      .spyOn(httpService, 'get')
      .mockReturnValueOnce(throwError(() => new Error('Error')));

    await expect(service.getSubmission(id, 'fakeToken')).rejects.toThrow(
      NotFoundException,
    );
  });
});
