import {catchError, lastValueFrom, map} from 'rxjs';
import {Injectable, NotFoundException} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import * as FormData from 'form-data';

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

    public async createSubmission(token: string, project_id: string, source: Express.Multer.File, scenario: string): Promise<any> {

        const formData = new FormData();
        formData.append('project_id', project_id);
        formData.append('source', source.buffer, { filename: source.originalname });
        formData.append('scenario', scenario);

        return await lastValueFrom(
            this.httpService
                .post(this.url + '/submissions?access_token=' + token, formData)
                .pipe(map((res) => res.data))
                .pipe(
                    catchError(() => {
                        throw new NotFoundException('Submission not found');
                    }),
                ),
        );
    }

    public async getSubmission(token: string, submission_id: string): Promise<any> {
        return await lastValueFrom(
            this.httpService
                .get(this.url + '/submissions/' + submission_id + '?access_token=' + token)
                .pipe(map((res) => res.data))
                .pipe(
                    catchError(() => {
                        throw new NotFoundException('Submission not found');
                    }),
                ),
        );
    }


}
