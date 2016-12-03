import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HearthstoneSeasonService } from '../services/hearthstone-season.service';
import { HearthstoneSeason } from '../models/hearthstone-season';

const SEASON_PER_PAGE = 12;

@Component({
    selector: 'my-hearthstone',
    templateUrl: '../views/hearthstone-seasons.html',
    providers: [ HearthstoneSeasonService ]
})

export class HearthstoneComponent implements OnInit {
    private page = 1;
    seasons: HearthstoneSeason[];
    hasNextPage = true;
    scrollDisabled = false;

    constructor(
        private router: Router,
        private hearthstoneSeasonService: HearthstoneSeasonService
    ) { }

    getSeasons(page: number): void {
        this.hearthstoneSeasonService
            .getSeasons(SEASON_PER_PAGE, page)
            .then(seasons => {
                if (page === 1) {
                    this.seasons = seasons;
                } else {
                    for (let season of seasons) {
                        this.seasons.push(season);
                    }
                }

                if (seasons.length < SEASON_PER_PAGE) {
                    this.hasNextPage = false;
                }
                this.page++;
                this.scrollDisabled = false;
            })
    }

    ngOnInit(): void {
        this.getSeasons(this.page);
    }

    onScroll(): void {
        this.scrollDisabled = true;

        if (this.hasNextPage) {
            this.getSeasons(this.page);
        }
    }

    gotoSeason(season: HearthstoneSeason): void {
        let link = ['/hearthstone/seasons', season.url];

        this.router.navigate(link);
    }
}