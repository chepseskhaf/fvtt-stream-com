import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    exports: [
        MatCommonModule,
        MatIconModule,
    ],
})
export class AppMaterialModule { }
