import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { GamesComponent } from './components/games.component';
import { GameComponent } from './components/game.component';
import { GourmetsComponent } from './components/gourmets.component';
import { HearthstoneComponent } from './components/hearthstone.component';
import { HearthstoneSeasonComponent } from './components/hearthstone-season.component';
import { HearthstoneDeckComponent } from './components/hearthstone-deck.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'games',
        children: [
            { path: '', component: GamesComponent },
            { path: ':url', component: GameComponent }
        ]
    },
    {
        path: 'gourmets',
        component: GourmetsComponent
    },
    {
        path: 'hearthstone',
        children: [
            { path: '', component: HearthstoneComponent },
            { path: 'seasons/:url', component: HearthstoneSeasonComponent},
            { path: 'deck/:id', component: HearthstoneDeckComponent },
            { path: '**', redirectTo: '/hearthstone', pathMatch: 'full' }
        ]
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }