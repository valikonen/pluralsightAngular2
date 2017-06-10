import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventsService } from '../shared/events.service';

import { IEvent } from '../shared/index';

@Component({
    template: `
        <div class="container">
          <img [src]="event?.imageUrl" [alt]="event?.name" class="event-image">
        
          <div class="row">
            <div class="col-md-11">
              <h2>{{event?.name}} </h2>
            </div>
          </div>
        
          <div class="row">
            <div class="col-md-6">
              <div><strong>Date:</strong> {{event?.date}}</div>
              <div><strong>Time:</strong> {{event?.time}}</div>
              <div><strong>Price:</strong> {{event?.price}}</div>
            </div>
            <div class="col-md-6">
              <address>
                <strong>Address:</strong><br />
                {{event?.location?.address}}<br />
                {{event?.location?.city}}, {{event?.location?.country}}
              </address>
            </div>
          </div>
        </div>
    `
})

export class EventDetailsComponent implements OnInit {
    
    event: IEvent;
    constructor(private eventsService: EventsService, private activatedRoute: ActivatedRoute){

    }

    ngOnInit(){
        this.event = this.eventsService.getEvent(+this.activatedRoute.snapshot.params['eventId']);
    }

}