import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { LazyLoadImageModule } from 'ng2-lazyload-image';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home.component';
import { GamesComponent } from './components/games.component';

import { AppRoutingModule } from './app-routing.module';

import { ImageHelperPipe } from './pipes/image-helper.pipe';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        LazyLoadImageModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        GamesComponent,
        ImageHelperPipe
    ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }