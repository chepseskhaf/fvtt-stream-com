import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';


interface VarContext<T> {
    appVar: T | null;
}

/**
 * Use this directive instead of ngIf to extract an observable value that can return falsy values or when displaying the child elements is not conditioned by the state of the observable.
 * USAGE: <ELEMENT *appVar="myValue$ | async as myValue">[...]</ELEMENT>
 */
@Directive({
    selector: '[appVar]'
})
export class VarDirective<T> {
    private context: VarContext<T> = { appVar: null };

    public constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<VarContext<T>>) {
        viewContainer.createEmbeddedView(templateRef, this.context);
    }

    @Input()
    public set appVar(value: T) {
        this.context.appVar = value;
    }
}
