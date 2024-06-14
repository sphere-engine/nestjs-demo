import { Test, TestingModule } from '@nestjs/testing';
import { ProblemService } from './problem.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { NotFoundException } from '@nestjs/common';
import { CreateProblemDto, CreateProblemResponseDto, GetProblemDto } from './dto/problem.dto';
import { throwError } from 'rxjs';

describe('ProblemService', () => {
  let service: ProblemService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [ProblemService],
    }).compile();

    service = module.get<ProblemService>(ProblemService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSubmission', () => {
    describe('given accessToken and submission object', () => {
      it('should return a promise', async () => {
        const createProblemDto: CreateProblemDto = {
          "problemId": 133006,
          "source": "console.log('test');",
          "compilerId": 12
        }
        
        const response: CreateProblemResponseDto = {
          id: '2184yhf9i9uuh38291g7dh8f9202',
        };

        jest
          .spyOn(service, 'createSubmission')
          .mockImplementation(() => new Promise((resolve) => resolve(response)));

        const result = await service.createSubmission('accessToken', createProblemDto);

        expect(service.createSubmission).toHaveBeenCalled();
        expect(service.createSubmission).toHaveBeenCalledWith('accessToken', createProblemDto);
    
        expect(result).toEqual(response);
      } )
    })

    describe('given a failed HTTP request', () => {
      it('should throw a NotFoundException', async () => {
        const createProblemDto: CreateProblemDto = {
          compilerId: 1,
          source: "console.log('test')",
          problemId: 133006,
        };

        jest
          .spyOn(httpService, 'post')
          .mockReturnValueOnce(throwError(() =>  new Error()));

        await expect(
          service.createSubmission('accessToken', createProblemDto),
        ).rejects.toThrow(NotFoundException);
      })
    })
  })

  describe('getSubmission', () => {
    describe('given accessToken and submission id', () => {
      it('should return a promise with object', async () => {
        const id: string = '1';
        const response: GetProblemDto = {
          id: 1,
          executing: false,
          date: '02.12.2022',
          compiler: null,
          result: null,
          problem: null,
        }

        jest
          .spyOn(service, 'getSubmission')
          .mockImplementation(() => new Promise((resolve) => resolve(response)));

          const result = await service.getSubmission('accessToken', id);

          expect(service.getSubmission).toHaveBeenCalledWith('accessToken', id);
          expect(result).toEqual(response);
      })
    })

    describe('given a failed HTTP request', () => {
      it('should throw a NotFoundException', async () => {
        const id: string = '1';

        jest
          .spyOn(httpService, 'get')
          .mockReturnValueOnce(throwError(() => new Error()));
    
        await expect(service.getSubmission('accessToken', id)).rejects.toThrow(
          NotFoundException,
        );
      })
    })
  })
});
