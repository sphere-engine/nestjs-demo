import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {ContainerService} from './container.service';
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('container')
export class ContainerController {
    constructor(private readonly containerService: ContainerService) {
    }

    @Get('/test/:token')
    public testContainer(@Param('token') token: string) {
        return this.containerService.testContainer(token);
    }

    @Post('/submission/:token/:project_id')
    @UseInterceptors(FileInterceptor('source'))
    public getSubmission(@Param('token') token: string, @Param('project_id') project_id: string, @UploadedFile() source: Express.Multer.File, @Body('scenario') scenario: string) {
        return this.containerService.createSubmission(token, project_id, source, scenario);
    }

    @Get('/submission/:token/:submission_id')
    public getSubmissionStatus(@Param('token') token: string, @Param('submission_id') submission_id: string) {
        return this.containerService.getSubmission(token, submission_id);
    }
}

