import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';
import {CategorieComponent} from './categorie/categorie.component';
import {AddCategorieComponent} from './categorie/add-categorie/add-categorie.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationGuard} from './guards/authentication.guard';
import {ProfileComponent} from './profile/profile.component';
import {ChangePasswordComponent} from './change-password/change-password.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: LayoutComponent, canActivate: [AuthenticationGuard] , children: [
      {path: 'profile', component: ProfileComponent},
      {path: 'changePassword', component: ChangePasswordComponent},
      {path: 'categorie', component: CategorieComponent},
      {path: 'categorie/new', component: AddCategorieComponent},
      {path: 'categorie/edit/:id', component: AddCategorieComponent}
    ]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
