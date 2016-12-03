import { Component, OnInit, Input } from '@angular/core';

import { HearthstoneCard } from '../models/hearthstone-card';
import { HearthstoneDeck } from '../models/hearthstone-deck';
import { HearthstoneCardService } from '../services/hearthstone-card.service';

@Component({
    selector: 'my-hearthstone-cards',
    templateUrl: '../views/hearthstone-cards.html',
    providers: [ HearthstoneCardService ]
})

export class HearthstoneCardsComponent implements OnInit {
    @Input() deck: HearthstoneDeck;
    cards: HearthstoneCard[];

    constructor(private hearthstoneCardService: HearthstoneCardService) { }

    ngOnInit(): void {
        let ids = [];
        this.deck.cards.map(card => ids.push(card.card));
        this.hearthstoneCardService.getDecks(ids.join(','))
            .then(cards => this.cards = cards);
    }

    getCount(id: string): number {
        return this.deck.cards.find(obj => obj.card == id).count;
    }
}