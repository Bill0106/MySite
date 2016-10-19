import { Component, OnInit } from '@angular/core';

import { GameService } from '../services/game.service';
import { Game } from '../models/game';

const GAME_PER_PAGE = 20;

@Component({
    selector: 'my-games',
    templateUrl: '../../resources/views/games.html',
    providers: [ GameService ]
})

export class GamesComponent implements OnInit {
    private page = 1;
    private hasNextPage = true;
    games: Game[];
    scrollDisabled = false;
    hideLoading = false;

    constructor(private gameService: GameService) { }

    getGames(page: number): void {
        this.gameService
            .getGames(GAME_PER_PAGE, page)
            .then(games => {
                if (page === 1) {
                    this.games = games;
                } else {
                    for (let game of games) {
                        this.games.push(game);
                    }
                }

                if (games.length < GAME_PER_PAGE) {
                    this.hasNextPage = false;
                    this.hideLoading = true;
                }
                this.page++;
                this.scrollDisabled = false;
            });
    }

    ngOnInit(): void {
        this.getGames(this.page);
    }

    onScroll(): void {
        this.scrollDisabled = true;

        if (this.hasNextPage) {
            this.getGames(this.page);
        }
    }
}