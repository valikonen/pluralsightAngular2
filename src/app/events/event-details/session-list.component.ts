import { Component, Input, OnChanges } from '@angular/core';

import { ISession } from '../shared/index';

@Component({
    selector: 'session-list',
    template: `
        <div class="row" *ngFor="let session of visibleSessions">
          <div class="col-md-10">
            <collapsible-well [title]="session.name">

                <div well-title> 
                    {{session.name}} 
                    <i class="fa fa-star" aria-hidden="true" *ngIf="session.voters.length > 3"></i>
                </div>         

                <div well-body>
                    <h6>{{session.presenter}}</h6>
                    <span>Duration: {{session.duration | duration}}</span><br />
                    <span>Level: {{session.level}}</span>
                    <p>{{session.abstract}}</p>
                </div>

            </collapsible-well>
          </div>
        </div>
    `,
    styles: [`
        .fa-star { color: orange; }
    `]
})

export class SessionListComponent implements OnChanges {

    @Input() sessions: ISession[];
    @Input() filterByInput: string;
    visibleSessions: ISession[] = [];

    ngOnChanges(){
        if(this.sessions) {
            this.filterSessions(this.filterByInput);
        }
    }

    filterSessions(filter){
        if(filter === 'all'){
            this.visibleSessions = this.sessions.slice(0);
        }
        else {
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLowerCase() === filter;
            })
        }
    }

}