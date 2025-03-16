import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Recurso} from '../core/models/Recurso';

@Injectable({
  providedIn: 'root'
})
export class TemasService {
  private baseURL = "http://localhost:8080"
  private options = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private httpClient: HttpClient) {
  }

  public getTemas() {
    return this.httpClient.get<Recurso[]>(`${this.baseURL}/api/temas`, {headers: this.options});
  }

  deleteTema(tema: Recurso) {
    return this.httpClient.delete<boolean>(`${this.baseURL}/api/temas/${tema.id}`, {headers: this.options});
  }

  saveTema(tema: Recurso) {
    const body = JSON.stringify(tema);
    return this.httpClient.post<boolean>(`${this.baseURL}/api/temas`, body, {headers: this.options});
  }
}
