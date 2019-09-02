import { Component } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-assignment';
  currentUser: User;

  constructor() {
    const currentUser =  sessionStorage.getItem('currentUser');

    if (currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
  }

}
