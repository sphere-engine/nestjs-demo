import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Body {
  source: string;
  compilerId: string;
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private readonly httpService: HttpClient) {}

  public getCompiler(id: string, token: string): Observable<{}> {
    return this.httpService.get<{}>(
      `http://localhost:3000/compiler/${id}/${token}`
    );
  }

  public createCompiler(body: Body, token: string): Observable<{}> {
    return this.httpService.post<{}>(
      `http://localhost:3000/compiler/${token}`,
      body
    );
  }
}
