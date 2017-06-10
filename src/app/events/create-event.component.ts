import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from './shared/events.service';

@Component({
    templateUrl: './create-event.component.html',
      styles: [`
    em {float:right; color:#E05C65; padding-left: 10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color:#999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})

export class CreateEventComponent {

    isDirty:boolean = true;

    constructor(private router: Router, private _eventsService: EventsService) {

    }

    cancel(){
        this.router.navigate(['/events']);
    }

    saveEvent(formVal){
        this._eventsService.saveEvent(formVal);    
        this.isDirty = false;
        this.router.navigate(['/events']);
    }

}