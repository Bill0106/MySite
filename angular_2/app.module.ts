import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
// import { GamesComponent } from './components/games.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports:      [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        // GamesComponent
    ],
    bootstrap   : [ AppComponent ]
})

export class AppModule { }