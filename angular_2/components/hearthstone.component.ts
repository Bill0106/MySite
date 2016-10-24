import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

    constructor(
        private router: Router,
        private hearthstoneSeasonService: HearthstoneSeasonService
    ) { }

    ngOnInit(): void {
        this.hearthstoneSeasonService
            .getSeasons()
            .then(seasons => this.seasons = seasons);
    }

    gotoSeason(season: HearthstoneSeason): void {
        let link = ['/hearthstone/seasons', season.url];

        this.router.navigate(link);
    }
}