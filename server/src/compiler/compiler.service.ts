import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCompilerDto,
  CreateCompilerResponseDto,
  GetCompilerDto,
} from './dto/compiler.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map } from 'rxjs';

@Injectable()
export class CompilerService {
  public constructor(private readonly httpService: HttpService) {}

  private url: string = 'https://fe530c0e.compilers.sphere-engine.com/api/v4';
  

  public async createSubmission(
    submission: CreateCompilerDto,
    token: string,
  ): Promise<CreateCompilerResponseDto> {
    const data: CreateCompilerResponseDto = await lastValueFrom(
      this.httpService
        .post(this.url + '/submissions?access_token=' + token, submission)
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new NotFoundException('Compiler not found');
          }),
        ),
    );
    return data;
  }

  public async getSubmission(
    id: string,
    token: string,
  ): Promise<GetCompilerDto> {
    const data: GetCompilerDto = await lastValueFrom(
      this.httpService
        .get(this.url + '/submissions/' + id + '?access_token=' + token)
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new NotFoundException('Submission not found');
          }),
        ),
    );
    return data;
  }
}
