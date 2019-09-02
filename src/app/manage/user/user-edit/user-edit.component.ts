import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder, FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  editMode = false;
  loading = false;
  buttonText = 'Create';

  user: User;
  loggedInUser: User;

  message: string;
  submitted: boolean;
  userForm: FormGroup;

  // selectedCars = [3];
  // cars = [
  //   { id: 1, name: 'Volvo' },
  //   { id: 2, name: 'Saab', disabled: true },
  //   { id: 3, name: 'Opel' },
  //   { id: 4, name: 'Audi' },
  // ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private userService: UserService,

  ) { }

  ngOnInit() {
    this.loggedInUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const username = this.route.snapshot.paramMap.get('id');



    if (username) {
      this.editMode = true;
      this.buttonText = 'Save';
      this.userService.getUserByName(username)
        .subscribe(
          (user: User) => {
            this.user = user;
            this.message = '';

            this.initForm(user);
          },
          (err) => {
            this.message = err.toString();
            console.error(err);
          }
        );
    } else {
      this.initForm();
    }
  }

  initForm(user?: User) {
    const formData = {
      username: '',
      password: '',
      email: '',
      valid: '',
      isActivated: '',
      ofSuperAdminInRole: false,
      ofGroupAdminInRole: false,
      ofGroupAssistInRole: false,
      groupList: '',
      channelList: '',
      adminGroupList: '',
    };

    if (this.editMode && user) {
        formData.username = user.username;
        formData.password = user.password;
        formData.email = user.email;
        formData.valid = user.valid;
        formData.isActivated = user.isActivated;
        formData.ofSuperAdminInRole = user.ofSuperAdminInRole;
        formData.ofGroupAdminInRole = user.ofGroupAdminInRole;
        formData.ofGroupAssistInRole = user.ofGroupAssistInRole;

    }

    const formControls = {
      username: new FormControl({ value: formData.username, disabled: this.editMode}),
      password: new FormControl(formData.password),
      email: new FormControl({ value: formData.email, disabled: !this.loggedInUser.ofSuperAdminInRole }),
      valid: new FormControl(formData.valid),
      isActivated: new FormControl(formData.isActivated),
      ofSuperAdminInRole: new FormControl({ value: formData.ofSuperAdminInRole, disabled: !this.loggedInUser.ofSuperAdminInRole}),
      ofGroupAdminInRole: new FormControl(formData.ofGroupAdminInRole),
      ofGroupAssistInRole: new FormControl(formData.ofGroupAssistInRole),
      // groupList: new FormControl(formData.groupList),
      // channelList: new FormControl(formData.channelList),
      // adminGroupList: new FormControl(formData.adminGroupList)
    };



    this.userForm = new FormGroup(formControls);
  }

  onSave() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;

    const data = {
      ...this.userForm.value,
      username: this.userForm.controls.username.value,
    };


    if (this.editMode) {
      this.userService.update(data)
        .subscribe(
          (user: User) => {
            console.log('successfully created.');
            this.loading = false;
            this.submitted = false;
          },
          (err) => {
            console.error(err);
            this.loading = false;
            this.submitted = false;
          },
        );
    } else {
      this.userService.creat(data)
        .subscribe(
          (user: User) => {
            console.log('successfully created.');
            this.loading = false;
            this.submitted = false;
          },
          (err) => {
            console.error(err);
            this.loading = false;
            this.submitted = false;
          },
        );
    }

    this.userService.getAll()
      .subscribe(
        (user: User) => {
          console.log('successfully created.');
          this.loading = false;
          this.submitted = false;
        },
        (err) => {
          console.error(err);
          this.loading = false;
          this.submitted = false;
        },
      );
  }


  onCancel() {
    this.router.navigate(['/manage/user']);
  }

  getBack(): void {
    this.location.back();
  }
}
