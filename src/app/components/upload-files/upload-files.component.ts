import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from '../../services/upload-files.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  panelOpenState = false;

  selectedFiles: FileList;
  //Es el array que contiene los items para mostrar el progreso de subida de cada archivo
  progressInfo = [];
  message = '';
  imageName = "";
  analizado = false;

  analizerFiles: Observable<any>;
  fileInfos: Observable<any>;
  jsonDetalles: JSON;

  constructor(private uploadFilesService: UploadFilesService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadFilesService.getFiles();
    
  }

  selectFiles(event) {
    this.progressInfo = [];
    event.target.files.length == 1 ? this.imageName = event.target.files[0].name : this.imageName = event.target.files.length + " archivos";
    this.selectedFiles = event.target.files;
  }

  upload(index, file) {
    this.progressInfo[index] = { value: 0, fileName: file.name };

    this.uploadFilesService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.fileInfos = this.uploadFilesService.getFiles();
        }
      },
      err => {
        this.progressInfo[index].value = 0;
        this.message = 'No se puede subir el archivo ' + file.name;
      });
      this.analizado=true;
  }

  uploadFiles() {
    this.message = '';
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }

  deleteFile(filename: string) {
    this.uploadFilesService.deleteFile(filename).subscribe(res => {
      this.message = res['message'];
      this.fileInfos = this.uploadFilesService.getFiles();
    });
  }

  analizerSelect() {
    this.progressInfo = [];
    this.analizerFiles = this.uploadFilesService.analisis();
    
    
  }


}
