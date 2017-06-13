import { Component } from '@angular/core';

import { AuthService } from '../user/auth.service';
import { ISession } from '../events/shared/event.model';
import { EventsService } from '../events/shared/events.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
    .nav.navbar-nav {font-size: 15px;}
    #searchForm {margin-right: 100px;}
    @media (max-width: 1200px) {#searchForm {display:none}}
  `]
})
export class NavBarComponent {

  searchTerm: string = '';
  foundSessions: ISession[];

  constructor(private authService: AuthService, private eventsService: EventsService) {
    
  }

  searchSessions(searchTerm) {
  this.eventsService.searchSessions(searchTerm).subscribe( sessions => {
      this.foundSessions = sessions;
      console.log(this.foundSessions);
    })
  }

}