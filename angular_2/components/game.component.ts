import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { GameService } from '../services/game.service';
import { GameTrophyService } from '../services/game-trophy.service';

import { Game } from '../models/game';
import { GameTrophy } from '../models/game-trophy';

const GAME_PLATFORMS = ['PlayStation 3', 'PlayStation Vita', 'PlayStation 4'];
const GAME_GENRES = ['Action', 'Adventure', 'Fighting', 'Racing', 'Role-Playing', 'Sports', 'Third-person shooter', 'Strategy'];
const RATE_TEXT = ['Terrible', 'Poor', 'Fair', 'Good', 'Great'];
const GAME_TROPHY_RARITY = ['Bronze', 'Gold', 'Silver', 'Platinum'];

@Component({
    selector: 'my-game',
    templateUrl: '../../resources/views/game.html',
    providers: [
        GameService,
        GameTrophyService
    ]
})

export class GameComponent implements OnInit {
    game: Game;
    trophy: GameTrophy;
    trophyComplete: number;
    platforms = GAME_PLATFORMS;
    genres = GAME_GENRES;
    rateText = RATE_TEXT;
    trophyRarity = GAME_TROPHY_RARITY;

    constructor (
        private router: ActivatedRoute,
        private titleService: Title,
        private gameService: GameService,
        private gameTrophyService: GameTrophyService
    ) { }

    ngOnInit(): void {
        this.router.params.forEach((params: Params) => {
            let url = params['url'];

            this.gameService.getGame(url)
                .then(game => {
                    this.game = game;

                    this.titleService.setTitle(game.name + ' - Games | Bill\'s Hobby');

                    this.gameTrophyService.getTrophy(game.trophies)
                        .then(trophy => {
                            this.trophy = trophy;
                            this.trophyComplete = trophy.earned / trophy.total * 100;
                        });
                });
        })
    }
}