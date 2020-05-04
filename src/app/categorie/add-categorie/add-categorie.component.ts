import { Component, OnInit } from '@angular/core';
import {Categorie} from '../../model/categorie';
import {CategorieService} from '../../services/categorie.service';
import {MessageService} from 'primeng';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {UploadFileService} from '../../services/upload-file.service';
import {J} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit {
  categorie = new Categorie();
  categories: Categorie [];
  selectedFiles: FileList;
  currentFileUpload: File;
  fileName = 'Choisir Image...';
  visible = true;
  constructor(private categorieService: CategorieService,
              private messageService: MessageService,
              private router: Router,
              private uploadFileService: UploadFileService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.categorieService.getById(id).subscribe(res => {
        this.categorie = res;
        this.visible = false;
        this.categorieService.getAll().subscribe(data => {
          this.categories = data;
          const index = this.categories.findIndex(cat => cat.id === res.parent?.id);
          this.categorie.parent =  this.categories[index];
        }, ex => {
          console.log(ex);
        });
      }, ex => {
        console.log(ex);
      });
    } else {
      this.getAll();
    }

  }

  getAll() {
    this.categorieService.getAll().subscribe(data => {
      this.categories = data;
    }, ex => {
      console.log(ex);
    });
  }


  ajouter() {
    this.categorieService.save(this.categorie).subscribe(res => {
      if (res.success) {
        this.messageService.add({severity: 'success', summary: 'Info', detail: res.message});
        this.router.navigate(['/categorie']);
      } else {
        this.messageService.add({severity: 'warn', summary: 'Attention', detail: res.message});
      }
    }, ex => {
      this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectuée'});
      console.log(ex);
    });
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.fileName = this.currentFileUpload.name;
  }


  upload() {
    if (this.selectedFiles) {
      this.uploadFileService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
          } else if (event instanceof HttpResponse) {
            //  this.router.navigate(['/categorie']);
            if (typeof event.body === 'string') {
              const body = JSON.parse(event.body);
              if (body.success) {
                this.categorie.image = body.message;
                if (this.visible) {
                  this.ajouter();
                } else {
                  this.modifier();
                }
              } else {
                this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectuée'});
              }
            }
          }
          this.selectedFiles = undefined;
        }
      );
    } else {
      this.modifier();
    }
  }

  modifier() {
    this.categorieService.update(this.categorie).subscribe(res => {
      if (res.success) {
        this.messageService.add({severity: 'success', summary: 'Info', detail: res.message});
        this.router.navigate(['/categorie']);
      } else {
        this.messageService.add({severity: 'warn', summary: 'Attention', detail: res.message});
      }
    }, ex => {
      this.messageService.add({severity: 'error', summary: 'Erreur', detail: 'Opération non effectuée'});
      console.log(ex);
    });
  }

}
