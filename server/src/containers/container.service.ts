import {catchError, lastValueFrom, map} from 'rxjs';
import {Injectable, NotFoundException} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class ContainerService {
    public constructor(private readonly httpService: HttpService) {
    }

    private url: string = 'https://fe530c0e.containers.sphere-engine.com/api/v1';


    public async testContainer(token: string): Promise<any> {
        return await lastValueFrom(
            this.httpService
                .get(this.url + '/test?access_token=' + token)
                .pipe(map((res) => res.data))
                .pipe(
                    catchError(() => {
                        throw new NotFoundException('Container not found');
                    }),
                ),
        );
    }
}
