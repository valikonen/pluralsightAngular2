import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EventsService } from '../shared/events.service';

import { IEvent } from '../shared/index';
import { ISession } from '../shared/index';

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

          <hr>

          <div class="row">
            <div class="col-md-2">
              <h3>Sessions</h3>
            </div>
            <div class="col-md-2">
              <a (click)="addSession()">Add Session</a>
            </div>
          </div>

          <session-list [sessions]="event?.sessions" *ngIf="! addMode"></session-list>

          <create-session *ngIf="addMode" (saveNewSession)="handleNewEventSession($event)" (cancelAddSession)="handleCancelAddSession()"></create-session>

        </div>
    `
})

export class EventDetailsComponent implements OnInit {
    
    event: IEvent;
    addMode: boolean;
    constructor(private eventsService: EventsService, private activatedRoute: ActivatedRoute){

    }

    ngOnInit(){
        this.event = this.eventsService.getEvent(+this.activatedRoute.snapshot.params['eventId']);
    }

    addSession(){
      this.addMode = true;
    }

    handleNewEventSession(session: ISession) {
      const nextId = Math.max.apply(null, this.event.sessions.map( session => {session.id} ));

      session.id = nextId + 1;
      this.event.sessions.push(session);
      this.eventsService.updateEvent(this.event);
      this.addMode = false;
    }

    handleCancelAddSession(){
      this.addMode = false;
    }

}