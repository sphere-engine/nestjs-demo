import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProblemService } from './problem.service';
import { CreateProblemDto } from './dto/problem.dto';

@Controller('problem')
export class ProblemController {
    constructor(private readonly problemService: ProblemService) {}

    @Get('/test/:accessToken')
    public testProblems(@Param('accessToken') accessToken: string) {
        return this.problemService.testProblems(accessToken);
    } 

    @Post('/:accessToken')
    public createSubmission(@Param('accessToken') accessToken: string, @Body() submission: CreateProblemDto) {
        return this.problemService.createSubmission(accessToken, submission);
    }

    @Get(':id/:accessToken')
    public getSubmission(@Param('accessToken') accessToken: string, @Param('id') id: string) {
        return this.problemService.getSubmission(accessToken, id);
    }
}
