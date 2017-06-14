import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EventsService } from '../shared/events.service';

import { IEvent } from '../shared/index';
import { ISession } from '../shared/index';

@Component({
    template: `
        <div class="container">
          <img [src]="event?.imageUrl" [alt]="event?.name" class="event-image">
        
          <div class="row">
            <div class="col-md-11">
              <h2> {{event?.name | uppercase}} </h2>
            </div>
          </div>
        
          <div class="row">
            <div class="col-md-6">
              <div><strong>Date:</strong> {{ event?.date | date: 'shortDate' }}</div>
              <div><strong>Time:</strong> {{event?.time}}</div>
              <div><strong>Price:</strong> {{event?.price | currency: 'USD': true}}</div>
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
            
            <div class="col-md-7">
              <button class="btn btn-default" [class.active]="filterBy === 'all'" (click)="filterBy = 'all'">All</button>
              <button class="btn btn-default" [class.active]="filterBy === 'beginer'" (click)="filterBy = 'beginer'">Beginer</button>
              <button class="btn btn-default" [class.active]="filterBy === 'intermediate'" (click)="filterBy = 'intermediate'">Intermediate</button>
              <button class="btn btn-default" [class.active]="filterBy === 'advanced'" (click)="filterBy = 'advanced'">Advanced</button>

              <button class="btn btn-default" [class.active]="sortBy === 'name'" (click)="sortBy = 'name'">By Name</button>
              <button class="btn btn-default" [class.active]="sortBy === 'voters'" (click)="sortBy = 'voters'">By Voters</button>
            </div>

            <div class="col-md-2">            
              <a (click)="addSession()">Add Session</a>
            </div>
          </div>

          <session-list [sessions]="event?.sessions" [filterByInput]="filterBy" [sortByInput]="sortBy" *ngIf="! addMode"></session-list>

          <create-session *ngIf="addMode" (saveNewSession)="handleNewEventSession($event)" (cancelAddSession)="handleCancelAddSession()"></create-session>

        </div>
    `
})

export class EventDetailsComponent implements OnInit {
    
    event: IEvent;
    addMode: boolean;
    filterBy: string = "all";

    constructor(private eventsService: EventsService, private activatedRoute: ActivatedRoute){

    }

    ngOnInit(){
        //this.event = this.eventsService.getEvent(+this.activatedRoute.snapshot.params['eventId']);

        this.activatedRoute.params.forEach( ( params: Params ) => {
          this.event = this.eventsService.getEvent(+params['eventId']);
          this.addMode = false;
        });
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