import { Component, OnInit } from '@angular/core';

import { EventsService } from './shared/events.service';
import { ToastrService } from '../common/toastr.service';

@Component({
    selector: 'events-list',
    template: `
        <div>
            <h3>Events</h3>
            <div *ngFor="let event of events" class="col-md-6">
                <event-thumbnail [event]="event" (getEventOut)="handleGetEvent($event)" (click)="showEventName(event.name)" #thumbnail> </event-thumbnail>
                <p>{{thumbnail.childVar}}</p>
                <button class="btn btn-default" (click)="thumbnail.logData(event)">Log data</button>
            </div>

            <hr>

    </div>
    `
})

export class EventsListComponent implements OnInit {

    events: any[];

    constructor(private eventsService: EventsService, private toastrService: ToastrService) {
        
    }
    ngOnInit(){
        this.events = this.eventsService.getEvents();
    }

    handleGetEvent(e){
        console.log(e);
    }

    showEventName(eventName) {
        this.toastrService.success(eventName);
    }
}