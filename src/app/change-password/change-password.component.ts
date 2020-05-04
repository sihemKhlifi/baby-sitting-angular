import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from '../services/utilisateur.service';
import {MessageService} from 'primeng';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  data = {id: '', oldPassword: '', newPassword: '', confirmPassword: ''};
  constructor(private utilisateurService: UtilisateurService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  changePassword(f) {
    this.data.id = JSON.parse(localStorage.getItem('currentUser')).id;
    this.utilisateurService.changePassword(this.data).subscribe(res => {
      if (res.success) {
        this.messageService.add({severity: 'success', summary: 'Succès', detail: res.message});
        f.submitted = false;
        this.data = {id: '', oldPassword: '', newPassword: '', confirmPassword: ''};
      } else {
        this.messageService.add({severity: 'warn', summary: 'Attention', detail: res.message});
      }
    }, ex => {
      this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectuée'});
      console.log(ex);
    });
  }
}
