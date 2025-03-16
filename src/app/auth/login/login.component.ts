import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuariosService,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  isValidField(field: string): boolean {
    return this.loginForm.get(field)!.invalid && (this.loginForm.get(field)!.dirty || this.loginForm.get(field)!.touched);
  }

  login(): void {
    if (!this.loginForm.valid) {
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.usuarioService.loginUsuario({ username, password }).subscribe(
      response => {
        if (response) {
          this.usuarioService.getUsuarioByUsername(username).subscribe(usuario => {
            console.log(usuario);
            this.authService.login(usuario);
            this.router.navigateByUrl('/main').then(() => window.location.reload());
          });
        }
      },
      error => {
        if (error.status === 400) {
          Swal.fire('Error', 'Login unsuccessful: Usuario o contraseña incorrectos', 'error');
        } else {
          Swal.fire('Error', 'An unexpected error occurred', 'error');
        }
      }
    );
  }

  checkValidity(): boolean {
    return this.loginForm.valid;
  }
}
