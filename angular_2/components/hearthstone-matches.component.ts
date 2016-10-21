import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

import { HearthstoneMatchService } from '../services/hearthstone-match.service';
import { HearthstoneDeckService } from '../services/hearthstone-deck.service';
import { HearthstoneSeasonService } from '../services/hearthstone-season.service';
import { HearthstoneSeason } from '../models/hearthstone-season';
import { HearthstoneMatch } from '../models/hearthstone-match';
import { HearthstoneDeck } from '../models/hearthstone-deck';

const HS_PLAYER_CLASSES = ['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'];

@Component({
    selector: 'my-hearthstone-matches',
    templateUrl: '../../resources/views/hearthstone-matches.html',
    providers: [ HearthstoneMatchService, HearthstoneDeckService, HearthstoneSeasonService ]
})

export class HearthstoneMatchesComponent implements OnInit {
    @Input() season: HearthstoneSeason;
    @Input() deck: HearthstoneDeck;
    @Input() tableType: string;
    matches: HearthstoneMatch[];
    decks: HearthstoneDeck[];
    seasons: HearthstoneSeason[];
    playerClasses = HS_PLAYER_CLASSES;

    constructor(
        private hearthstoneMatchService: HearthstoneMatchService,
        private hearthstoneDeckService: HearthstoneDeckService,
        private hearthstoneSeasonService: HearthstoneSeasonService,
        private router: Router
    ) { }

    private nextMonth(time: number): number {
        let year = new Date(time).getFullYear();
        let month = new Date(time).getMonth();
        let next: string;

        if (month === 11) {
            next = '01/01/' + (year + 1);
        } else {
            next = (month + 2) + '/01/' + year;
        }

        return new Date(next).getTime();
    }

    private formatDate(time: number): string {
        let year = new Date(time).getFullYear();
        let month = new Date(time).getMonth() + 1;
        let n: string;

        if (month < 10) {
            n = '0' + month.toString();
        } else {
            n = month.toString();
        }

        return year.toString() + n;
    }

    private getDecks(matches: HearthstoneMatch[]): void {
        let ids = [];

        matches.forEach((match) => {
            if (ids.indexOf(match.deck_id) < 0) {
                ids.push(match.deck_id);
            }
        });

        this.hearthstoneDeckService
            .getDecks(ids.join(','))
            .then(decks => this.decks = decks);
    }

    private getSeasons(matches: HearthstoneMatch[]): void {
        let months = [];

        matches.forEach((match) => {
            let season = this.formatDate(match.time);
            if (months.indexOf(season) < 0) {
                months.push(season);
            }
        });

        this.hearthstoneSeasonService
            .getSeasons(months.join(','))
            .then(seasons => {
                let raw = [];

                seasons.forEach((season) => {
                    let y = season.month.toString().substr(0, 4);
                    let m = season.month.toString().substr(4, 2);

                    season.month = new Date(m + '/01/' + y).getTime();
                    raw.push(season);
                });

                this.seasons = raw;
            });
    }

    ngOnInit(): void {
        if (this.tableType == 'deck') {
            console.log(this.season.month);
            this.hearthstoneMatchService
                .getMatches(this.season.month)
                .then(matches => {
                    this.matches = matches;
                    this.getDecks(matches);
                });
        } else if (this.tableType == 'season') {
            this.hearthstoneMatchService
                .getMatches(null, this.deck._id)
                .then(matches => {
                    this.matches = matches;
                    this.getSeasons(matches);
                });
        }
    }

    getStats(deck?: string, season?: number, opponent?: string): any {
        let filteredMatches: HearthstoneMatch[] = this.matches;

        if (deck) {
            filteredMatches = filteredMatches.filter(match => match.deck_id === deck)
        }

        if (season) {
            let nextMonth = this.nextMonth(season);
            filteredMatches = filteredMatches.filter(match => (match.time >= season && match.time < nextMonth))
        }

        if (opponent) {
            filteredMatches = filteredMatches.filter(match => match.opponent === this.playerClasses.indexOf(opponent))
        }

        let wins = filteredMatches.filter(match => match.result === 1).length;
        let loses = filteredMatches.filter(match => match.result === -1).length;

        return {
            string: wins + ' - ' + loses,
            pct: wins / (wins + loses)
        };
    }
}