import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { GameService } from '../services/game.service';

import { Game } from '../models/game';
import { GameTrophy } from '../models/game-trophy';

import { GamePlatforms } from '../../config/game-platforms';
import { GameGenres } from '../../config/game-genres';
const RATE_TEXT = ['Terrible', 'Poor', 'Fair', 'Good', 'Great'];

@Component({
    selector: 'my-game',
    templateUrl: '../views/game.html',
    providers: [ GameService ]
})

export class GameComponent implements OnInit {
    game: Game;
    trophy: GameTrophy;
    trophyComplete: number;
    platform: string;
    genre: string;
    rateText = RATE_TEXT;

    constructor (
        private router: Router,
        private activatedRouter: ActivatedRoute,
        private titleService: Title,
        private gameService: GameService
    ) { }

    ngOnInit(): void {
        this.activatedRouter.params.forEach((params: Params) => {
            let url = params['url'];

            this.gameService.getGame(url)
                .then(game => {
                    if (!game) {
                        this.router.navigate(['/games']);
                    } else {
                        this.game = game;
                        this.platform = GamePlatforms.find(platform => platform.value == this.game.platform).name;
                        this.genre = GameGenres.find(genre => genre.value == this.game.genre).name;
                        this.titleService.setTitle(game.name + ' - Games | Bill\'s Hobby');

                        this.gameService.getGameTrophy(url)
                            .then(trophy => {
                                this.trophy = trophy;
                                this.trophyComplete = trophy.earned / trophy.total * 100;
                            });
                    }
                });
        })
    }
}