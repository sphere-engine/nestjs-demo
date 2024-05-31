import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CompilerService } from './compiler.service';
import { CreateCompilerDto } from './dto/compiler.dto';

@Controller('compiler')
export class CompilerController {
  constructor(private readonly compilerService: CompilerService) {}

  @Post()
  public createSubmission(@Body() submission: CreateCompilerDto) {
    return this.compilerService.createSubmission(submission);
  }

  @Get(':id')
  public getSubmission(@Param('id') id: string) {
    return this.compilerService.getSubmission(id);
  }
}
