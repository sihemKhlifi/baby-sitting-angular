import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {CandidatService} from '../services/candidat.service';
import {AbonneService} from '../services/abonne.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';
import {AuthenticationService} from '../services/authentication.service';
import {Utilisateur} from '../model/utilisateur';
import {UtilisateurService} from '../services/utilisateur.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = new Utilisateur();
  constructor(@Inject(DOCUMENT) private document: Document,
              private router: Router,
              private messageService: MessageService,
              private authenticationService: AuthenticationService,
              private utilisateurService: UtilisateurService) {}

  ngOnInit() {
    this.document.body.classList.add('gray-bg');
  }

  authenticate() {
    this.authenticationService.authenticate(this.user).subscribe(res => {
      const token = res.headers.get('Authorization');
      this.authenticationService.storeToken(token);
      this.utilisateurService.getByEmail(this.user.email).subscribe(data => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.router.navigate(['/']);
        setTimeout (() => {
          location.reload();
        }, 1000);
      });
    }, ex => {
      this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Merci de vérifier votre email ou mot de passe'});
    });
  }

}
