import { Component, OnInit } from '@angular/core';

import { GameService } from '../services/game.service';
import { Game } from '../models/game';

@Component({
    selector: 'my-games',
    templateUrl: '../../resources/views/games.html',
    providers: [ GameService ]
})

export class GamesComponent implements OnInit {
    games: Game[];

    constructor(private gameService: GameService) { }

    getGames(): void {
        this.gameService
            .getGames()
            .then(games => this.games = games);
    }

    ngOnInit(): void {
        this.getGames();
    }
}