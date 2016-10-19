import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { GameService } from '../services/game.service';

import { Game } from '../models/game';

const GAME_PLATFORMS = ['PlayStation 3', 'PlayStation Vita', 'PlayStation 4'];
const GAME_GENRES = ['Action', 'Adventure', 'Fighting', 'Racing', 'Role-Playing', 'Sports', 'Third-person shooter', 'Strategy'];
const RATE_TEXT = ['Terrible', 'Poor', 'Fair', 'Good', 'Great'];

@Component({
    selector: 'my-game',
    templateUrl: '../../resources/views/game.html',
    providers: [ GameService ]
})

export class GameComponent implements OnInit {
    game: Game;
    platforms = GAME_PLATFORMS;
    genres = GAME_GENRES;
    rateText = RATE_TEXT;

    constructor (
        private router: ActivatedRoute,
        private gameService: GameService
    ) { }

    ngOnInit(): void {
        this.router.params.forEach((params: Params) => {
            let url = params['url'];

            this.gameService.getGame(url)
                .then(game => this.game = game);
        })
    }
}