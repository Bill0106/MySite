import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home.component';
import { GamesComponent } from './components/games.component';
import { GameComponent } from './components/game.component';
import { GourmetsComponent } from './components/gourmets.component';
import { HearthstoneComponent } from './components/hearthstone.component';
import { HearthstoneSeasonComponent } from './components/hearthstone-season.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'games', component: GamesComponent },
    { path: 'games/:url', component: GameComponent },
    { path: 'gourmets', component: GourmetsComponent },
    { path: 'hearthstone', component: HearthstoneComponent },
    { path: 'hearthstone/seasons/:url', component: HearthstoneSeasonComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }