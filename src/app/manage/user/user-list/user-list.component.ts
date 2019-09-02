import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    // private location: Location,
  ) { }

  ngOnInit() {
    this.userService.getAll().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (err) => {
        console.error(err);
      },
    );
  }

  onDelete(username: string) {
    this.userService.delete(username)
      .subscribe(
        (data: User) => {
          location.reload();
        },
        (err) => {
          console.error(err);
        }
      );
  }
}
