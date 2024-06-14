import { Test, TestingModule } from '@nestjs/testing';
import { ProblemController } from './problem.controller';
import { HttpModule } from '@nestjs/axios';
import { ProblemService } from './problem.service';
import { CreateProblemDto, CreateProblemResponseDto, GetProblemDto } from './dto/problem.dto';

describe('ProblemController', () => {
  let controller: ProblemController;
  let service: ProblemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ProblemController],
      providers: [ProblemService],
    }).compile();

    controller = module.get<ProblemController>(ProblemController);
    service = module.get<ProblemService>(ProblemService);
  });

  describe('testProblems', () => {
    it('should call testProblems on service with correct accessToken', async () => {
      const accessToken = 'accessToken';
      const response = { message: 'You can use Sphere Engine Problems API.' };

      jest.spyOn(service, 'testProblems').mockResolvedValue(response);

      const result = await controller.testProblems(accessToken);

      expect(service.testProblems).toHaveBeenCalledWith(accessToken);
      expect(result).toEqual(response);
    });
  })


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSubmission', () => {
    it('should create problem submission and return its id', async () => {
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

      const result = await controller.createSubmission('accessToken', createProblemDto);

      expect(service.createSubmission).toHaveBeenCalled();
      expect(service.createSubmission).toHaveBeenCalledWith(
        'accessToken',
        createProblemDto
      );
  
      expect(result).toEqual(response);
    })
  })

  describe('getSubmission', () => {
    it('should return submission body by id', async () => {
      const id: string = '1';
      const submission: GetProblemDto = {
        id: 1,
        executing: false,
        date: '02.12.2022',
        compiler: null,
        result: null,
        problem: null,
      }

      jest
      .spyOn(service, 'getSubmission')
      .mockImplementation(() => new Promise((resolve) => resolve(submission)));

    const result = await controller.getSubmission('accessToken', id);

    expect(service.getSubmission).toHaveBeenCalledWith(
      'accessToken',
      id
    );
    expect(result).toEqual(submission);
    })
  })
});
