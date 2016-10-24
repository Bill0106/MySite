import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

const BACKGROUND_MAP = [
    {
        page: 'games',
        color: '#242628'
    },
    {
        page: 'gourmets',
        color: '#FEFCEF'
    },
    {
        page: 'hearthstone',
        color: '#f1d6a9'
    }
];

@Component({
    selector: 'my-app',
    templateUrl: '../../resources/views/nav.html'
})

export class AppComponent {
    constructor(private router: Router) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd) {
                let url = val.url.split('/').filter(ele => ele != '');
                this.changeBackground(url[0]);
            }
        });
    }

    changeBackground(page: string): void {
        if (page) {
            let map = BACKGROUND_MAP.find(map => map.page == page);

            if (map) {
                let mySite = document.getElementById('mySite');
                mySite.style.backgroundColor = map.color;
            }
        }
    }
}