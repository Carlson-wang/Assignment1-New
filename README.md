# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

- No chat；create dashboard；
- User admin：User admin privileges to add other users to channels or groups
- super admin：manage website


## function
1. group admin
	- remove groups/channel，users from channel
	- allow a user to become a group assis of the group
2. super admin
	- create users with group admin role
	- remove users
	- can provide another user with super-admin role
	- has group admin role.
3. group assis
	- add/remove users in the group from channels within the group
	- create channels within the group

4. user
	- id: username
	- initialization: one user called 'super' is Super-admin
	- email address

## implements
Login user：http://localhost:4200/Login
Super user：password: super

- Login page
	+ Enter username，remembered in local storage
	+ logout： clears username out of local storage

## Angular Front End
ng new assignment1
cd assignment1
npm start

npm install bootstrap@next
npm install --save rxjs-compat

- Login page
	+ login component and login html template
	+ ng generate component login
	+ ng generate component group

- model
    + create models folder
    + create user class


## NodeJS Back End Services
create folder "server" under Angular project
npm init
create cooresponding folder and files
install and import express ...

- Login page
    + login component and login html template
    + ng generate component login
    + ng generate component group

- model
    + create models folder
    + create user class

