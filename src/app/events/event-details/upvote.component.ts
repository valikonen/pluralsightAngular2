import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'upvote',
    template: `
        <div class="votingWidgetContainer pointable" (click)="onClick()">
            <div class="well votingWidget">
                <div class="votingButton">
                    <i *ngIf="voted" class="fa fa-heart" aria-hidden="true"></i>
                    <i *ngIf="!voted" class="fa fa-heart-o" aria-hidden="true"></i>
                </div>
                <div class="badge badge-inverse votingCount">
                    {{count}}
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./upvote.component.css']
})

export class UpvoteComponent {

    @Input() count: number;
    @Input() voted: boolean;
    @Output() vote = new EventEmitter();

    onClick() {
        this.vote.emit({});
    }
}