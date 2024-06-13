import {Module} from "@nestjs/common";
import {ContainerService} from "./container.service";
import {ContainerController} from "./container.controller";
import {HttpModule} from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    controllers: [ContainerController],
    providers: [ContainerService],
})

export class ContainerModule {}