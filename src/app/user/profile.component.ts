import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em {float:right; color:#E05C65; padding-left: 10px;}
    .error input {background-color:#E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color:#999; }
    .error :ms-input-placeholder { color: #999; }
  `]
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(private router:Router, private authService: AuthService) {
  
  }

  ngOnInit() {
     this.firstName = new FormControl(this.authService.currentUser.firstName,[ Validators.required, Validators.pattern('[a-zA-Z].*') ]) ;
     this.lastName = new FormControl(this.authService.currentUser.firstName, Validators.required);

     this.profileForm = new FormGroup({
       firstName: this.firstName,
       lastName: this.lastName
     });
  }

  cancel(){
    this.router.navigate(['events']);
  }

  saveProfile(formValue){
    this.authService.updateCurrentUser(formValue.firstName, formValue.lastName);
  }
  validateFirstName() {
    return this.firstName.valid || this.firstName.touched
  }
  validateLastName() {
    return this.lastName.valid || this.lastName.touched
  }
       
}