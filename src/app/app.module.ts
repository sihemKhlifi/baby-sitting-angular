import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { ContentComponent } from './layout/content/content.component';
import { CategorieComponent } from './categorie/categorie.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {
  ButtonModule,
  ConfirmationService,
  ConfirmDialogModule,
  DialogModule,
  InputTextModule,
  MessageService, RadioButtonModule,
  TableModule, ToastModule,
  TooltipModule
} from 'primeng';
import { AddCategorieComponent } from './categorie/add-categorie/add-categorie.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {JwtInterceptorService} from './services/jwt-interceptor.service';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    ContentComponent,
    CategorieComponent,
    AddCategorieComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ConfirmDialogModule,
    TooltipModule,
    ButtonModule,
    DialogModule,
    ToastModule,
    RadioButtonModule
  ],
  providers: [MessageService, ConfirmationService,
    {provide: HTTP_INTERCEPTORS , useClass: JwtInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
