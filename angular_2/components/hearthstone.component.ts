import { Component, OnInit } from '@angular/core';

import { HearthstoneSeasonService } from '../services/hearthstone-season.service';
import { HearthstoneSeason } from '../models/hearthstone-season';

const SEASON_PER_PAGE = 12;

@Component({
    selector: 'my-hearthstone',
    templateUrl: '../../resources/views/hearthstone-seasons.html',
    providers: [ HearthstoneSeasonService ]
})

export class HearthstoneComponent implements OnInit {
    seasons: HearthstoneSeason[];

    constructor(private hearthstoneSeasonService: HearthstoneSeasonService) { }

    ngOnInit(): void {
        this.hearthstoneSeasonService
            .getSeasons()
            .then(seasons => this.seasons = seasons);
    }
}