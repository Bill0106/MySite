import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GameService } from '../services/game.service';
import { Game } from '../models/game';

const GAME_PER_PAGE = 20;

@Component({
    selector: 'my-games',
    templateUrl: '../views/games.html',
    providers: [ GameService ]
})

export class GamesComponent implements OnInit {
    private page = 1;
    games: Game[];
    hasNextPage = true;
    scrollDisabled = false;

    constructor(
        private gameService: GameService,
        private router: Router
    ) { }

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

    gotoDetail(game: Game): void {
        let link = ['/games', game.url];
        this.router.navigate(link);
    }
}