import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Utilisateur} from '../model/utilisateur';
import {CandidatService} from '../services/candidat.service';
import {AbonneService} from '../services/abonne.service';
import {Router} from '@angular/router';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user = new Utilisateur();
  selectedValue: any = 'Candidat';
  constructor(@Inject(DOCUMENT) private document: Document,
              private candidatService: CandidatService,
              private abonneService: AbonneService,
              private router: Router,
              private messageService: MessageService) {}

  ngOnInit() {
    this.document.body.classList.add('gray-bg');
  }

  register() {
    if (this.selectedValue === 'Candidat') {
      this.candidatService.register(this.user).subscribe(res => {
        if (res.success) {
          this.messageService.add({severity: 'success', summary: 'Succès', detail: res.message});
          this.router.navigate(['/login']);
        } else {
          this.messageService.add({severity: 'warn', summary: 'Attention', detail: res.message});
        }
      }, ex => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectué'});
        console.log(ex);
      });
    } else {

      this.abonneService.register(this.user).subscribe(res => {
        if (res.success) {
          this.messageService.add({severity: 'success', summary: 'Succès', detail: res.message});
          this.router.navigate(['/login']);
        } else {
          this.messageService.add({severity: 'warn', summary: 'Attention', detail: res.message});
        }
      }, ex => {
        this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectué'});
        console.log(ex);
      });
    }
  }
}
