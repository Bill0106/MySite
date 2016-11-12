import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HearthstoneSeason } from '../models/hearthstone-season';
import { AuthKeys } from '../../config/auth-keys';

@Injectable()
export class HearthstoneSeasonService {
    private url = 'api/hearth-stone/seasons';
    private headers = new Headers({ 'auth': AuthKeys.get });

    constructor(private http: Http) { }

    getSeasons(month?: string): Promise<HearthstoneSeason[]> {
        let apiUrl = this.url;

        if (month) { apiUrl = this.url + '?months=' + month }

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as HearthstoneSeason[]);
    }

    getSeason(url: string): Promise<HearthstoneSeason> {
        let apiUrl = this.url + '/' + url;

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as HearthstoneSeason);
    }
}