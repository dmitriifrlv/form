import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import {Router} from "@angular/router";
import { SignUpService } from "../../services/sign-up.service";
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  return password && repeatPassword && password.value === repeatPassword.value ? null : { passwordMatches: true };
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnDestroy{
  addedANewUser:Subscription;
  signUpForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required
    ]),
    lastName: new FormControl('',[
      Validators.required
    ]),
    gender: new FormControl('Male'),
    age: new FormControl('10',[
      Validators.pattern("^[1-9][0-9]$|^(100)$")
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]
    ),
    password: new FormControl('', [
      Validators.required
    ]),
    repeatPassword: new FormControl('', [
      Validators.required
    ])
  }, {validators:passwordValidator})

  ngOnDestroy(){ 
    this.addedANewUser.unsubscribe()
  }
 constructor(private router: Router, private addAUser:SignUpService) { }
 
 onClickEvent() {
  const user = {
    id:uuidv4(),
    firstName:this.signUpForm.value.firstName,
    lastName:this.signUpForm.value.lastName,
    gender:this.signUpForm.value.gender,
    age:this.signUpForm.value.age,
    email:this.signUpForm.value.email,
    password:this.signUpForm.value.password,
  }
   console.log(user)
 }

 onSubmit(){
   const user = {
     id:uuidv4(),
     firstName:this.signUpForm.value.firstName,
     lastName:this.signUpForm.value.lastName,
     gender:this.signUpForm.value.gender,
     age:this.signUpForm.value.age,
     email:this.signUpForm.value.email,
     password:this.signUpForm.value.password,
   }
   const myObserver = {
    next: () => console.log('Adding a new user...'),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => this.router.navigate(['/users']),
  };
   if(this.signUpForm.valid){
     this.addedANewUser=this.addAUser.addANewUser(user).subscribe(myObserver)
   }
 }

}
