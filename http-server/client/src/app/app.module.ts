import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { CharacterComponent } from './components/character/character.component';
import { VarDirective } from './directives/var.directive';


@NgModule({
    declarations: [
        VarDirective,
        AppComponent,
        CharacterComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppMaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
