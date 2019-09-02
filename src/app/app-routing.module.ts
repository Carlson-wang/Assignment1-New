import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
// import {AuthGuard} from './helpers/auth.guard';
import { ManageComponent } from './manage/manage.component';
import { UserEditComponent } from './manage/user/user-edit/user-edit.component';
import { UserComponent } from './manage/user/user.component';

const routes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent },
  { path: 'manage',
    component: ManageComponent,
    children: [
      { path: 'user',
        children: [
          { path: 'edit/:id', component: UserEditComponent },
          { path: 'new', component: UserEditComponent },
          { path: '', component: UserComponent, pathMatch: 'full' },
          // { path: 'view/:id', component: UserDetailsComponent },
        ]},

    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
