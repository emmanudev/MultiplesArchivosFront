import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpRequest, HttpEvent,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  //baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
    formData.append('files', file);
   
    const req = new HttpRequest('POST', `http://192.168.1.73:8080/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  getFiles(){
    return this.http.get(`http://192.168.1.73:8080/files`);
  }

  deleteFile(filename: string){
    return this.http.get(`http://192.168.1.73:8080/delete/${filename}`);
  }

  analisis(){
    return this.http.get(`http://192.168.1.73:8080/analizer`);
  }

}
