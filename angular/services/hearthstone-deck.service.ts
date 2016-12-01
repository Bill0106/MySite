import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { HearthstoneDeck } from '../models/hearthstone-deck';
import { Keys } from '../../config/keys';

@Injectable()
export class HearthstoneDeckService {
    private url = 'api/hearthstone-decks';
    private headers = new Headers({ 'auth': Keys.api.GET });

    constructor(private http: Http) { }

    getDecks(ids: string): Promise<HearthstoneDeck[]> {
        let apiUrl = this.url + '?ids=' + ids;

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json().list as HearthstoneDeck[]);
    }

    getDeck(id: string): Promise<HearthstoneDeck> {
        let apiUrl = this.url + '/' + id;

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as HearthstoneDeck);
    }
}