import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { GameTrophy } from '../models/game-trophy';
import { AuthKeys } from '../../config/auth-keys';

@Injectable()
export class GameTrophyService {
    private url = 'api/games/trophy';
    private headers = new Headers({ 'auth': AuthKeys.get });

    constructor(private http: Http) { }

    getTrophy(id: string): Promise<GameTrophy> {
        let apiUrl = this.url + '/' + id;

        return this.http.get(apiUrl, { headers: this.headers })
            .toPromise()
            .then(response => response.json() as GameTrophy);
    }
}