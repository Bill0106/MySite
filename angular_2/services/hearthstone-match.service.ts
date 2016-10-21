import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HearthstoneMatch } from '../models/hearthstone-match';

@Injectable()
export class HearthstoneMatchService {
    private url = 'api/hearth-stone/matches';
    private headers = new Headers({ 'auth': 'ljpon3UUVTMMmIhE6Kcf' });

    constructor(private http: Http) { }

    getMatches(season?: number): Promise<HearthstoneMatch[]> {
        let apiUrl = this.url;

        if (season) {
            apiUrl = this.url + '?season=' + season;
        }

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json().list as HearthstoneMatch[]);
    }
}