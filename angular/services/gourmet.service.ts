import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Gourmet } from '../models/gourmet';
import { AuthKeys } from '../../config/auth-keys';

@Injectable()
export class GourmetService {
    private url = 'api/gourmets';
    private headers = new Headers({ 'auth': AuthKeys.get });

    constructor(private http: Http) { }

    getGourmets(limit: number, page: number): Promise<Gourmet[]> {
        let apiUrl = this.url + '?limit=' + limit + '&page=' + page;

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json().list as Gourmet[]);
    }
}