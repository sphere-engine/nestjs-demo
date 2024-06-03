import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CompilerModule} from './compiler/compiler.module';
import {ContainerModule} from "./containers/container.module";

@Module({
    imports: [CompilerModule, ContainerModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
