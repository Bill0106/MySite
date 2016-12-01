import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HearthstoneCard } from '../models/hearthstone-card';
import { Keys } from '../../config/keys';

@Injectable()
export class HearthstoneCardService {
    private url = 'api/hearthstone-cards';
    private headers = new Headers({ 'auth': Keys.api.GET });

    constructor(private http: Http) { }

    getDecks(ids: string): Promise<HearthstoneCard[]> {
        let apiUrl = this.url + '?ids=' + ids;

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as HearthstoneCard[]);
    }
}