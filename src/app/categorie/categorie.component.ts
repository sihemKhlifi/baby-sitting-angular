import { Component, OnInit } from '@angular/core';
import {CategorieService} from '../services/categorie.service';
import {Categorie} from '../model/categorie';
import {ConfirmationService, MessageService} from 'primeng';
import {Router} from '@angular/router';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  categories: Categorie[];
  constructor(private categorieService: CategorieService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.categorieService.getAll().subscribe(data => {
      this.categories = data;
    }, ex => {
      console.log(ex);
    });
  }

  supprimer(cat) {
    this.confirmationService.confirm({
      message: 'Vous etes sur de supprimer?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categorieService.delete(cat.id).subscribe(res => {
          if (res.success) {
            this.messageService.add({severity: 'success', summary: 'Info', detail: res.message});
            this.getAll();
          } else {
            this.messageService.add({severity: 'warn', summary: 'Attention', detail: res.message});
          }
        }, ex => {
          this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectuée'});
          console.log(ex);
        });
      },
    });
  }

  editer(cat) {
  this.router.navigate(['/categorie/edit', cat.id]);
  }
}
