import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IEvent } from './shared/index';

@Component({
    selector: 'event-thumbnail',
    template: `
        <div class="well hoverwell thumbnail" [routerLink]="['/events', event.id]">
          <h2>{{event?.name | uppercase}}</h2>
          <div>Date: {{event?.date | date:'shortDate'}}</div>
          <div [ngSwitch]="event?.time" [class.green]="event?.time === '8:00 am'">
            Time: {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
          </div>
          <div>Price: {{event?.price | currency: 'USD':true}}</div>
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
        .green {
            color: green;
        }
        .well {
            cursor: pointer;
        }
    `]
})

export class EventThumbnailComponent {

    @Input() event: IEvent;

    @Output() getEventOut = new EventEmitter();

    childVar: string = "Child value";

    getEvent(event){
        this.getEventOut.emit(this.event)
    }

    logData(event){
        console.log('Log data: ', event);
    }

}