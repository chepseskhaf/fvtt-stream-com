import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public characterId: string | undefined;

    public constructor() {
        this.characterId = window.location.href.match(/character\/(\S+)$/)?.[1];
    }
}
