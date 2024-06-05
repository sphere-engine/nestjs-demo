import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompilerModule } from './compiler/compiler.module';
import { ProblemModule } from './problem/problem.module';

@Module({
  imports: [CompilerModule, ProblemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
