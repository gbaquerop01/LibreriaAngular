import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Recurso} from '../core/models/Recurso';

@Injectable({
  providedIn: 'root'
})
export class FormatosService {
  private baseURL = "http://localhost:8080"
  private options = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private httpClient: HttpClient) {
  }

  public getFormatos() {
    return this.httpClient.get<Recurso[]>(`${this.baseURL}/api/formatos`, {headers: this.options});
  }
}
