import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { lastValueFrom, map, catchError } from 'rxjs';
import {
    CreateProblemDto,
    CreateProblemResponseDto,
    GetProblemDto,
    TestProblemsResponseDto
  } from './dto/problem.dto';

@Injectable()
export class ProblemService {
    public constructor(private readonly httpService: HttpService) {}

    private url: string = 'https://fe530c0e.problems.sphere-engine.com/api/v4';

    public async testProblems(accessToken: string): Promise<TestProblemsResponseDto> {

        return await lastValueFrom(this.httpService
            .get(this.url + '/test?access_token=' + accessToken)
            .pipe(map((res) => res.data))
            .pipe(
                catchError(() => {
                    throw new HttpException({
                        status: HttpStatus.UNAUTHORIZED,
                        error: 'Unauthorized access',
                    }, HttpStatus.UNAUTHORIZED);
                })
            ))
    }

    public async createSubmission(accessToken: string, submission: CreateProblemDto): Promise<CreateProblemResponseDto> {

        const response: CreateProblemResponseDto = await lastValueFrom(
            this.httpService
              .post(this.url + '/submissions?access_token=' + accessToken, submission)
              .pipe(map((res) => res.data))
              .pipe(
                catchError(() => {
                  throw new NotFoundException('Problem or Compiler not found');
                }),
              ),
          );
          return response;
    }

    public async getSubmission(accessToken: string, id: string): Promise<GetProblemDto> {

        const response: GetProblemDto = await lastValueFrom(
            this.httpService
              .get(this.url + '/submissions/' + id + '?access_token=' + accessToken)
              .pipe(map((res) => res.data))
              .pipe(
                catchError(() => {
                  throw new NotFoundException('Submission not found');
                }),
              ),
          );
          return response;
    }
}
