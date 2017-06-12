import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventsService } from './shared/events.service';

import { IEvent } from './shared/index';

@Component({
    selector: 'events-list',
    template: `
        <div>
            <h3>Events</h3>
            <div *ngFor="let event of events" class="col-md-6">
                <event-thumbnail [event]="event" (getEventOut)="handleGetEvent($event)" #thumbnail> </event-thumbnail>
                <p>{{thumbnail.childVar}}</p>
                <button class="btn btn-default" (click)="thumbnail.logData(event)">Log data</button>
            </div>

            <hr>

    </div>
    `
})

export class EventsListComponent implements OnInit {

    events: IEvent[];

    constructor(private eventsService: EventsService, private activatedRoute: ActivatedRoute) {
        
    }
    ngOnInit(){
        this.events = this.activatedRoute.snapshot.data['events'];
    }

    handleGetEvent(e){
        console.log(e);
    }

}