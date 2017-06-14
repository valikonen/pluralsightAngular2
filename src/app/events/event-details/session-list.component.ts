import { Component, Input, OnChanges } from '@angular/core';

import { ISession } from '../shared/index';
import { AuthService } from '../../user/auth.service';
import { VoterService } from './voter.service';

@Component({
    selector: 'session-list',
    template: `
        <div class="row" *ngFor="let session of visibleSessions">

        

        <div class="col-md-1">
            <upvote (vote)="toggleVote(session)" [count]="session.voters.length" [voted]="userHasVoted(session)" *ngIf="auth.isAuthenticated()"></upvote>
        </div>

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
    @Input() sortByInput: string;

    visibleSessions: ISession[] = [];


    constructor( private auth: AuthService, private voterService: VoterService ){
            
    }

    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterByInput);
            this.sortByInput === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    toggleVote(session: ISession) {
        if(this.userHasVoted(session)) {
            this.voterService.deleteVoter(session, this.auth.currentUser.userName);
        }
        else {
            this.voterService.addVoter(session, this.auth.currentUser.userName);
        }
        if(this.sortByInput === 'votes') {
            this.visibleSessions.sort(sortByVotesDesc);
        }
    }

    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
    }

    filterSessions(filter) {
        if (filter === 'all') {
            this.visibleSessions = this.sessions.slice(0);
        }
        else {
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLowerCase() === filter;
            })
        }
    }

}

function sortByNameAsc(s1, s2) {
    if (s1.name > s2.name) return 1;
    else if (s1.name === s2.name) return 0;
    else return -1;
}

function sortByVotesDesc(s1, s2) {
    return s2.voters.length - s1.voters.length;
}