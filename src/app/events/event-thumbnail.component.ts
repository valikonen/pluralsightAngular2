import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    template: `
        <div class="well hoverwell thumbnail">
          <h2>{{event?.name}}</h2>
          <div>Date: {{event?.date}}</div>
          <div [ngSwitch]="event?.time">
            Time: {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
          </div>
          <div>Price: \${{event?.price}}</div>
          <div *ngIf="event?.location">
            <span>Location: {{event?.location?.address}}</span>
            <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
          </div>
          <div *ngIf="event?.onlineUrl">
            Online URL: {{event?.onlineUrl}}
          </div>
          <button class="btn btn-success" (click)="getEvent()">Get Event</button>
        </div>
    `,
    styles: [`
        .pad-left {
            margin-left: 10px;
        }
    `]
})

export class EventThumbnailComponent {

    @Input() event: any;

    @Output() getEventOut = new EventEmitter();

    childVar: string = "Child value";

    getEvent(event){
        this.getEventOut.emit(this.event)
    }

    logData(event){
        console.log('Log data: ', event);
    }

}