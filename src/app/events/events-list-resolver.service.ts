import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventsService } from './shared/events.service';

@Injectable()
export class EventListResolver implements Resolve<any> {

    constructor(private eventService: EventsService) {

    }

    resolve(){
        return this.eventService.getEvents().map(events => events)
    }

}
