import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: `
        <h3>Add new Event</h3>
        <button class="btn btn-default" (click)="cancel()">Cancel</button>
    `
})

export class CreateEventComponent {

    constructor(private router: Router) {

    }

    cancel(){
        this.router.navigate(['/events']);
    }

}