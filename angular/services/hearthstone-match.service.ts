import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HearthstoneMatch } from '../models/hearthstone-match';
import { AuthKeys } from '../../config/auth-keys';

@Injectable()
export class HearthstoneMatchService {
    private url = 'api/hearth-stone/matches';
    private headers = new Headers({ 'auth': AuthKeys.get });

    constructor(private http: Http) { }

    getMatches(season?: number, deck?: string): Promise<HearthstoneMatch[]> {
        let apiUrl = this.url;

        if (season) { apiUrl = this.url + '?season=' + season }

        if (deck) { apiUrl = this.url + '?deck=' + deck }

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json().list as HearthstoneMatch[]);
    }
}