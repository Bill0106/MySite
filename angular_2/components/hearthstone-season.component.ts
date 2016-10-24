import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { HearthstoneSeasonService } from '../services/hearthstone-season.service';
import { HearthstoneSeason } from '../models/hearthstone-season';

@Component({
    selector: 'my-hearthstone-season',
    templateUrl: '../../resources/views/hearthstone-season.html',
    providers: [ HearthstoneSeasonService ]
})

export class HearthstoneSeasonComponent implements OnInit {
    season: HearthstoneSeason;

    constructor(
        private router: ActivatedRoute,
        private titleService: Title,
        private hearthstoneSeasonService: HearthstoneSeasonService
    ) { }

    ngOnInit(): void {
        this.router.params.forEach((params: Params) => {
            let url = params['url'];

            this.hearthstoneSeasonService
                .getSeason(url)
                .then(season => {
                    this.season = season;

                    this.titleService.setTitle(season.title + ' - Hearthstone Season | Bill\'s Hobby');
                });
        })
    }
}