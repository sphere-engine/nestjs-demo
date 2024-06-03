import {Controller, Get, Param} from '@nestjs/common';
import {ContainerService} from './container.service';


@Controller('container')
export class ContainerController {
    constructor(private readonly containerService: ContainerService) {
    }

    @Get('/test/:token')
    public testContainer(@Param('token') token: string) {
        return this.containerService.testContainer(token);
    }
}

