import { Component, OnInit, Input } from '@angular/core';

import { HearthstoneMatchService } from '../services/hearthstone-match.service';
import { HearthstoneDeckService } from '../services/hearthstone-deck.service';
import { HearthstoneSeason } from '../models/hearthstone-season';
import { HearthstoneMatch } from '../models/hearthstone-match';
import { HearthstoneDeck } from '../models/hearthstone-deck';

const HS_PLAYER_CLASSES = ['Druid', 'Hunter', 'Mage', 'Paladin', 'Priest', 'Rogue', 'Shaman', 'Warlock', 'Warrior'];

@Component({
    selector: 'my-hearthstone-matches',
    templateUrl: '../../resources/views/hearthstone-matches.html',
    providers: [ HearthstoneMatchService, HearthstoneDeckService ]
})

export class HearthstoneMatchesComponent implements OnInit {
    @Input() season: HearthstoneSeason;
    @Input() tableType: string;
    matches: HearthstoneMatch[];
    decks: HearthstoneDeck[];
    playerClasses = HS_PLAYER_CLASSES;

    constructor(
        private hearthstoneMatchService: HearthstoneMatchService,
        private hearthstoneDeckService: HearthstoneDeckService
    ) { }

    private getDecks(matches: HearthstoneMatch[]): void {
        let ids = [];

        for (let match of matches) {
            if (ids.indexOf(match.deck_id) < 0) {
                ids.push(match.deck_id);
            }
        }

        this.hearthstoneDeckService
            .getDecks(ids.join(','))
            .then(decks => this.decks = decks);
    }

    private getNextMonth(time: number): number {
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

    ngOnInit(): void {
        this.hearthstoneMatchService
            .getMatches(this.season.month)
            .then(matches => {
                this.matches = matches;

                if (this.tableType == 'deck') {
                    this.getDecks(matches);
                }
            });
    }

    getStats(matches: HearthstoneMatch[], deck?: string, season?: number, opponent?: string): any {
        let filteredMatches: HearthstoneMatch[] = matches;

        if (deck) { filteredMatches = filteredMatches.filter(match => match.deck_id === deck) }

        if (season) {
            let nextMonth = this.getNextMonth(season);
            filteredMatches = filteredMatches.filter(match => (match.time >= season && match.time < nextMonth))
        }

        if (opponent) { filteredMatches = filteredMatches.filter(match => match.opponent === this.playerClasses.indexOf(opponent)) }

        let wins = filteredMatches.filter(match => match.result === 1).length;
        let loses = filteredMatches.filter(match => match.result === -1).length;

        return {
            string: wins + ' - ' + loses,
            pct: wins / (wins + loses)
        };
    }
}