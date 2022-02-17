import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import {Router} from '@angular/router';

// users model
class User {
  username: string;
  email: string;
  password: string;

  constructor(username: string, email: string, password: string) {
      this.username = username;
      this.email = email;
      this.password = password;
  }

}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  model = new User('','','');
  private users: User[] = [];

  constructor(private route: Router) { }

  onEyeCLick(eye: HTMLElement, id: string) {
    const field: HTMLInputElement = <HTMLInputElement>document.getElementById(id);
    eye.classList.toggle("bi-eye");
    eye.classList.toggle("bi-eye-slash");

    if (field.type === "password") field.type = "text";
    else field.type = "password";
  }

  logUser(model: NgModel) {
    console.log(model); 
  }
  
  submit() {
      console.log(this.model);
      this.addUser(this.model);
      this.route.navigate(['/home']);
  }

  addUser(user: User) {
    this.users.push(user);
    console.log('user added', this.users);
  }

  ngOnInit(): void {
  }

}

