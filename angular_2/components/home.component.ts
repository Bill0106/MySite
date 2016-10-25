import { Component } from '@angular/core';
import { Router } from '@angular/router';

export class Section {
    image: string;
    title: string;
    link: string;
}

const SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
const SECTIONS: Section[] = [
    {
        image: 'http://7xtddu.com1.z0.glb.clouddn.com/84abb1fdfd670845666ac89f712b539a.jpg',
        title: 'PlayStation Games',
        link: '/games',
    },
    {
        image: 'http://7xtddu.com1.z0.glb.clouddn.com/09d6aeb87783661768b52c73f18c3069.jpg',
        title: 'Gourmet Tour',
        link: '/gourmets',
    },
    {
        image: 'http://7xtddu.com1.z0.glb.clouddn.com/fd7f11741da6dd01db206a29d0536427.jpg',
        title: 'Hearthstone',
        link: '/hearthstone',
    },
];

@Component({
    selector: 'my-home',
    templateUrl: '../../resources/views/home.html'
})

export class HomeComponent {
    sections = SECTIONS;

    constructor(private router: Router) {};

    gotoSection(section: Section): void {
        let link = [section.link];
        this.router.navigate(link);
    }

    swipe(action: string = SWIPE_ACTION.RIGHT): void {
        if (action == SWIPE_ACTION.RIGHT) {
            $("#indexCarousel").carousel('prev');
        } else if (action == SWIPE_ACTION.LEFT) {
            $("#indexCarousel").carousel('next');
        }
    }
}