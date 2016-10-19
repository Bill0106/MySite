import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Game } from '../models/game';

@Injectable()
export class GameService {
    private url = 'api/games';
    private headers = new Headers({ 'auth': 'ljpon3UUVTMMmIhE6Kcf' });

    constructor(private http: Http) { };

    getGames(limit: number, page: number): Promise<Game[]> {
        let apiUrl = this.url + '?limit=' + limit + '&page=' + page;

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json().list as Game[]);
    }
}