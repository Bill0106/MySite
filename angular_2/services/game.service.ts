import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Game } from '../models/game';

@Injectable()
export class GameService {
    private url = 'api/games';
    private headers = new Headers({ 'auth': 'ljpon3UUVTMMmIhE6Kcf' });

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

    constructor(private http: Http) { };

    getGames(): Promise<Game[]> {
        return this.http.get(this.url, { headers: this.headers })
            .toPromise()
            .then(response => response.json().list as Game[])
            .catch(this.handleError);
    }
}