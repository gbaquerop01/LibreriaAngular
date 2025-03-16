import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Libro} from '../core/models/Libro';
import {Recurso} from '../core/models/Recurso';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  private baseURL = "http://localhost:8080"
  private options = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }

  public getAutores() {
    return this.httpClient.get<Recurso[]>(`${this.baseURL}/api/autores`, {headers: this.options});
  }

  public postAutor(autor: Recurso) {
    const body = JSON.stringify(autor);
    return this.httpClient.post<Recurso>(`${this.baseURL}/api/autores`, body, {headers: this.options});
  }

  public deleteAutor(autor: Recurso) {
    return this.httpClient.delete<Boolean>(`${this.baseURL}/api/autores/${autor.id}`, {headers: this.options});
  }

  public updateAutor(autor: Recurso) {
    const body = JSON.stringify(autor);
    return this.httpClient.put<Recurso>(`${this.baseURL}/api/autores`, body, {headers: this.options});
  }
}
