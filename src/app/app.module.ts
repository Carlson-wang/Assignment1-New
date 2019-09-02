import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageComponent } from './manage/manage.component';
import { ChannelComponent } from './manage/channel/channel.component';
import { UserComponent } from './manage/user/user.component';
import { GroupComponent } from './manage/group/group.component';
import { UserListComponent } from './manage/user/user-list/user-list.component';
import { UserEditComponent } from './manage/user/user-edit/user-edit.component';
import { UserDetailsComponent } from './manage/user/user-details/user-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgSelectModule} from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    ManageComponent,
    ChannelComponent,
    UserComponent,
    GroupComponent,
    UserListComponent,
    UserEditComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
