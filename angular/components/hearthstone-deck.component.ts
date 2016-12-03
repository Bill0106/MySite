import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from "@angular/platform-browser";

import { HearthstoneDeckService } from '../services/hearthstone-deck.service';
import { HearthstoneDeck } from '../models/hearthstone-deck';

@Component({
    selector: 'my-hearthstone-deck',
    templateUrl: '../views/hearthstone-deck.html',
    providers: [ HearthstoneDeckService ]
})

export class HearthstoneDeckComponent implements OnInit {
    deck: HearthstoneDeck;
    cards: any;

    constructor(
        private router: ActivatedRoute,
        private titleService: Title,
        private hearthstoneDeckService: HearthstoneDeckService
    ) { }

    private formatCards(cards: any): void {
        let format = [];

        cards.forEach(card => {
            if (Object.keys(format).indexOf(card._id) > 0) {
                format[card._id].count = 2;
            } else {
                format[card._id] = {
                    card: card,
                    count: 1
                };
            }
        });

        this.cards = Object.values(format);
    }

    ngOnInit(): void {
        this.router.params.forEach((params: Params) => {
            this.hearthstoneDeckService
                .getDeck(params['id'])
                .then(deck => {
                    this.deck = deck;

                    this.titleService.setTitle(deck.name + ' - Hearthstone Deck | Bill\'s Hobby');

                    this.formatCards(deck.cards);
                });
        })
    }
}