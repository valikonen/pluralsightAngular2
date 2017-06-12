import { Component, Input } from '@angular/core';

@Component({
    selector: 'collapsible-well',
    template: `
        <div class="well" (click)="toggleVisible()">
            <h4>
                <ng-content select="[well-title]"></ng-content>
            </h4>    
            <ng-content *ngIf="isVisible" select="[well-body]"> </ng-content>
        </div>
    `
})

export class CollapsibleWellComponent {
    
    isVisible: boolean = true;

    toggleVisible() {
        this.isVisible = !this.isVisible;
    }

}