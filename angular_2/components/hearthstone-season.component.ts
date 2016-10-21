import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

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
        private hearthstoneSeasonService: HearthstoneSeasonService
    ) { }

    ngOnInit(): void {
        this.router.params.forEach((params: Params) => {
            let url = params['url'];

            this.hearthstoneSeasonService
                .getSeason(url)
                .then(season => this.season = season);
        })
    }
}