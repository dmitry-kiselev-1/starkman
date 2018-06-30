import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigService {

  configUrl = 'assets/config.json';

  constructor(private httpClient: HttpClient) {}

  getConfig(): Observable<object> {
    return this.httpClient.get(this.configUrl);
  }

}
