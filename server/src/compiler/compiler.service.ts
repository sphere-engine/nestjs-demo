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
  private token: string = '29c165edc73086362d91f8f989e3ed72';

  public async createSubmission(
    submission: CreateCompilerDto,
  ): Promise<CreateCompilerResponseDto> {
    const data: CreateCompilerResponseDto = await lastValueFrom(
      this.httpService
        .post(this.url + '/submissions?access_token=' + this.token, submission)
        .pipe(map((res) => res.data))
        .pipe(
          catchError(() => {
            throw new NotFoundException('Compiler not found');
          }),
        ),
    );
    return data;
  }

  public async getSubmission(id: string): Promise<GetCompilerDto> {
    const data: GetCompilerDto = await lastValueFrom(
      this.httpService
        .get(this.url + '/submissions/' + id + '?access_token=' + this.token)
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
