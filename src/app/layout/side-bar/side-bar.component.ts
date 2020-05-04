import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Utilisateur} from '../../model/utilisateur';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  user = new Utilisateur();
  role;
  constructor(private authenticationService: AuthenticationService) { }
  logout() {
    this.authenticationService.logout();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.role = this.authenticationService.hasRole();
  }

}
