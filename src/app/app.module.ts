import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav/navbar.component';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventsService,
  EventRouterActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe

} from './events/index';

import { Error404Component } from './errors/404.component';
import { JQ_TOKEN, TOASTR_TOKEN, Toastr, CollapsibleWellComponent, SimpleModalComponent , ModalTriggerDirective} from './common/index';

import { AuthService } from './user/auth.service';

declare let toastr: Toastr;
declare let jQuery: Object;

@NgModule({
  declarations: [
    AppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    Error404Component,
    CreateEventComponent,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    EventsService,
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    EventRouterActivator,
    { 
      provide: 'canDeactivateCreateEvent', 
      useValue: checkDirtyState 
    },
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    EventListResolver,
    AuthService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }



function checkDirtyState(component:CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true
}
