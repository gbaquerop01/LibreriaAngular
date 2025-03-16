import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../core/models/usuario/Usuario';
import {UsuarioLoginDTO} from '../core/models/usuario/UsuarioLoginDTO';
import {UsuarioRegisterDTO} from '../core/models/usuario/UsuarioRegisterDTO';
import {UsuarioUpdateDTO} from '../core/models/dto/UsuarioUpdateDTO';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseURL = "http://localhost:8080"
  private options = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private httpClient: HttpClient) {}

  public getUsuarios() {
    return this.httpClient.get<Usuario[]>(`${this.baseURL}/api/usuarios`, {headers: this.options});
  }

  public getUsuarioByUsername(username: string){
    return this.httpClient.get<Usuario>(`${this.baseURL}/api/usuarios/${username}`, {headers: this.options});
  }

  public deleteUsuario(usuario: Usuario) {
    return this.httpClient.delete<boolean>(`${this.baseURL}/api/usuarios/${usuario.username}`, {headers: this.options});
  }

  public saveUsuario(usuario: UsuarioRegisterDTO) {
    const body = JSON.stringify(usuario);
    return this.httpClient.post<boolean>(`${this.baseURL}/api/usuarios`, body, {headers: this.options});
  }

  public loginUsuario(usuario: UsuarioLoginDTO) {
    const body = JSON.stringify(usuario);
    return this.httpClient.post<boolean>(`${this.baseURL}/api/usuarios/login`, body, {headers: this.options});
  }

  public updateUsuario(username: string, updatedUser: UsuarioUpdateDTO) {
    const body = JSON.stringify(updatedUser);
    return this.httpClient.put<boolean>(`${this.baseURL}/api/usuarios/${username}`, body, { headers: this.options });
  }
}
