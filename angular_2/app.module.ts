import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { LazyLoadImageModule } from 'ng2-lazyload-image';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { GamesComponent } from './components/games.component';
import { GameComponent } from './components/game.component';
import { GourmetsComponent } from './components/gourmets.component';

import { AppRoutingModule } from './app-routing.module';

import { ImageHelperPipe } from './pipes/image-helper.pipe';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        InfiniteScrollModule,
        LazyLoadImageModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        GamesComponent,
        GameComponent,
        GourmetsComponent,
        ImageHelperPipe
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }