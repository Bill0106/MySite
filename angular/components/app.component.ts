import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

const PAGE_MAP = [
    {
        page: 'games',
        color: '#242628',
        title: 'Games'
    },
    {
        page: 'gourmets',
        color: '#FEFCEF',
        title: 'Gourmets Tour'
    },
    {
        page: 'hearthstone',
        color: '#f1d6a9',
        title: 'Hearthstone'
    }
];

@Component({
    selector: 'my-app',
    templateUrl: '../views/nav.html'
})

export class AppComponent {
    constructor(
        private router: Router,
        private titleService: Title
    ) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd) {
                let url = val.url.split('/').filter(ele => ele != '');
                this.changePageProperty(url);
            }
        });
    }

    changePageProperty(page: any): void {
        let pageTitle = 'Bill\'s Hobby | Write as a Interest';

        if (page) {
            let map = PAGE_MAP.find(map => map.page == page[0]);

            if (map) {
                let mySite = document.getElementById('mySite');
                mySite.style.backgroundColor = map.color;
                pageTitle = map.title + ' | Bill\'s Hobby';
            }
        }

        this.titleService.setTitle(pageTitle);
    }
}