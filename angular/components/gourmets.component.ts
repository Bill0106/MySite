import { Component, OnInit } from '@angular/core';

import { GourmetService } from '../services/gourmet.service';
import { Gourmet } from '../models/gourmet';

const GOURMETS_PER_PAGE = 24;

@Component({
    selector: 'my-gourmets',
    templateUrl: '../views/gourmets.html',
    providers: [ GourmetService ]
})

export class GourmetsComponent implements OnInit {
    private page = 1;
    gourmets: Gourmet[];
    hasNextPage = true;
    scrollDisabled = false;

    constructor(private gourmetService: GourmetService) { }

    getGourmets(): void {
        this.gourmetService
            .getGourmets(GOURMETS_PER_PAGE, this.page)
            .then(gourmets => {
                if (this.page === 1) {
                    this.gourmets = gourmets;
                } else {
                    for (let gourmet of gourmets) {
                        this.gourmets.push(gourmet);
                    }
                }

                if (gourmets.length < GOURMETS_PER_PAGE) {
                    this.hasNextPage = false;
                }

                this.page++;
                this.scrollDisabled = false;
            });
    }

    ngOnInit(): void {
        this.getGourmets();
    }

    onScroll(): void {
        this.scrollDisabled = true;

        if (this.hasNextPage) {
            this.getGourmets();
        }
    }
}