import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Libro} from '../core/models/Libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  private baseURL = "http://localhost:8080"
  private options = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private httpClient: HttpClient) {
  }
  public getLibros(){
    return this.httpClient.get<Libro[]>(`${this.baseURL}/api/libros`, {headers: this.options});
  }

  public postLibro(libro: Libro){
    const body = JSON.stringify(libro);
    return this.httpClient.post<boolean>(`${this.baseURL}/api/libros`, body, {headers: this.options});
  }

  putLibro(libro: Libro) {
    const body = JSON.stringify(libro);
    return this.httpClient.put<boolean>(`${this.baseURL}/api/libros`, body, {headers: this.options});
  }

  deleteLibro(libroSelected: Libro) {
    return this.httpClient.delete<boolean>(`${this.baseURL}/api/libros/${libroSelected.ISBN}`, {headers: this.options});
  }
}
