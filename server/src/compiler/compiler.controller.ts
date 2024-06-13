import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { CreateCompilerDto } from './dto/compiler.dto';

@Controller('compiler')
export class CompilerController {
  constructor(private readonly compilerService: CompilerService) {}

  @Post(':access_token')
  public createSubmission(
    @Body() submission: CreateCompilerDto,
    @Param('access_token') token: string,
  ) {
    return this.compilerService.createSubmission(submission, token);
  }

  @Get(':id/:access_token')
  public getSubmission(
    @Param('id') id: string,
    @Param('access_token') token: string,
  ) {
    return this.compilerService.getSubmission(id, token);
  }
}
