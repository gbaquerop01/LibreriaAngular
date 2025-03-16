import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Libro} from '../core/models/Libro';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private baseURL = "http://localhost:8080"
  private options = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private httpClient: HttpClient) {
  }


  createFactura(cachedLibros: Libro[], loggedInUser: string | null, totalPrecio: number) {
    const facturaBody = {
      libros: cachedLibros,
      usuario: loggedInUser,
      precio: totalPrecio
    };

    const body = JSON.stringify(facturaBody);
    console.log(body);
    console.log(this.httpClient.post<boolean>(`${this.baseURL}/api/facturas`, body, {headers: this.options}));

  }
}
