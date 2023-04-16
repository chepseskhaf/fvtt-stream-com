import { Injectable } from '@angular/core';

import { filter, first, Observable, share, shareReplay } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private websocket$: Observable<WebSocket>;
    private data$: Observable<any>;

    public constructor() {
        this.websocket$ = new Observable<WebSocket>(subscriber => {
            const websocket = new WebSocket(environment.websocketUrl);

            websocket.onopen = function (ev) {
                console.info(`Websocket connection to ${environment.websocketUrl} successfuly established.`);
                subscriber.next(websocket);
            };

            websocket.onerror = (ev) => {
                console.error(ev);
                subscriber.error(ev);
            };

            return () => {
                websocket.close();
            };
        }).pipe(
            shareReplay({ bufferSize: 1, refCount: true })
        );

        this.data$ = new Observable(subscriber => {
            let websocket: WebSocket;

            const sub = this.websocket$.subscribe(ws => {
                ws.onmessage = async (msgEvent) => {
                    const data = JSON.parse(await msgEvent.data.text());
                    subscriber.next(data);
                };
                websocket = ws;
            });

            return () => {
                websocket.onmessage = null;
                sub.unsubscribe();
            }
        }).pipe(
            share()
        );
    }

    public getCharacterData$(characterId: string): Observable<any> {
        return new Observable(subscriber => {
            const sub1 = this.data$.pipe(
                filter(data => data._id === characterId)
            ).subscribe(subscriber);

            const sub2 = this.websocket$.pipe(first()).subscribe(ws => {
                ws.send(characterId);
            });

            return () => {
                sub2.unsubscribe();
                sub1.unsubscribe();
            }
        });
    }
}
