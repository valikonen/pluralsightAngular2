import { Routes } from '@angular/router';

import { 
    EventsListComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouterActivator,
    EventListResolver,
    CreateSessionComponent
} from './events/index';

import { Error404Component } from './errors/404.component';


export const appRoutes = [
    { path: 'events', component: EventsListComponent, resolve: { events: EventListResolver } },
    { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'events/:eventId', component: EventDetailsComponent, canActivate: [ EventRouterActivator ] },
    { path: 'events/session/new', component: CreateSessionComponent },
    
    { path: 'user', loadChildren: './user/user.module#UserModule' },

    { path: '404', component: Error404Component },
    //{ path: '', redirectTo: '/events', pathMatch: 'full' }
];