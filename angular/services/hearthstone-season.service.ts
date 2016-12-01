import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HearthstoneSeason } from '../models/hearthstone-season';
import { Keys } from '../../config/keys';

@Injectable()
export class HearthstoneSeasonService {
    private url = 'api/hearthstone-seasons';
    private headers = new Headers({ 'auth': Keys.api.GET });

    constructor(private http: Http) { }

    getSeasons(limit?: number, page?: number): Promise<HearthstoneSeason[]> {
        let apiUrl = this.url + '?limit=' + limit + '&page=' + page;

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json().list as HearthstoneSeason[]);
    }

    getSeasonsByMonth(month: string): Promise<HearthstoneSeason[]> {
        let apiUrl = this.url + '?months=' + month;

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json().list as HearthstoneSeason[]);
    }

    getSeason(url: string): Promise<HearthstoneSeason> {
        let apiUrl = this.url + '/' + url;

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as HearthstoneSeason);
    }
}