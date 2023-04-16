import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { DataService } from '#services';
import { assert } from '#utils';


@Component({
    selector: 'app-character',
    templateUrl: './character.component.html',
    styleUrls: ['./character.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharacterComponent implements OnInit {

    @Input() public id: string | undefined;

    public data$: Observable<any> | undefined;

    public constructor(private dataService: DataService) { }

    public ngOnInit(): void {
        assert(this.id !== undefined);
        this.data$ = this.dataService.getCharacterData$(this.id);
    }
}
