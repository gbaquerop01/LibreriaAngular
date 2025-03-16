import { Component, OnInit } from '@angular/core';
import { Usuario } from '../core/models/usuario/Usuario';
import {AuthService} from '../services/auth.service';
import {UsuariosService} from '../services/usuarios.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioUpdateDTO} from '../core/models/dto/UsuarioUpdateDTO';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userinfo',
  standalone: false,
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {
  userForm: FormGroup;
  currentUser: Usuario | null = null;

  constructor(
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loadUserInfo();
    this.initializeForm();
  }

  initializeForm(): void {
    // Initialize form with default values
    this.userForm = this.fb.group({
      direccion: [''], // Address fields
      planta: [''],
      puerta: [''],
      ciudad: ['']
    });
  }

  loadUserInfo(): void {
    const username = this.authService.getLoggedInUsername();
    if (username) {
      this.usuariosService.getUsuarioByUsername(username).subscribe({
        next: (user: Usuario) => {
          this.currentUser = user;
          // Patch the form with current user data (except username and email)
          this.userForm.patchValue({
            direccion: user.address.direccion,
            planta: user.address.planta,
            puerta: user.address.puerta,
            ciudad: user.address.ciudad
          });
        },
        error: (err) => {
          Swal.fire('Error', 'Error al recoger la informacion del usuario', 'error');
        }
      });
    }
  }

  // On form submit, send the updated information to the server
  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const updatedUser: UsuarioUpdateDTO = {
      address: {
        direccion: this.userForm.value.direccion,
        planta: this.userForm.value.planta,
        puerta: this.userForm.value.puerta,
        ciudad: this.userForm.value.ciudad
      }
    };

    const username = this.authService.getLoggedInUsername();
    if (username) {
      this.usuariosService.updateUsuario(username, updatedUser).subscribe({
        next: (response) => {
          Swal.fire('Success', 'Se ha actualizado el usuario y sus campos', 'success');
        },
        error: (err) => {
          Swal.fire('Error', 'Ha ocurrido un error al actualizar el usuario y sus campos', 'error');
        }
      });
    }
  }

  goToMainPage() {
    this.router.navigate(['/main']);
  }
}
