import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuariosService,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, this.gmailValidator]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  ngOnInit(): void {
    // Revalidate confirmPassword when password changes
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.registerForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  isValidField(field: string): boolean {
    return this.registerForm.get(field)!.invalid && (this.registerForm.get(field)!.dirty || this.registerForm.get(field)!.touched);
  }

  checkValidity(): boolean {
    return this.registerForm.valid;
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  gmailValidator(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    return email.includes('@gmail.com') ? null : { gmailDomain: true };
  }

  register(): void {
    if (!this.registerForm.valid) {
      return;
    }

    const { username, email, password } = this.registerForm.value;

    this.usuarioService.saveUsuario({ username, email, password }).subscribe(
      () => {
        this.usuarioService.getUsuarioByUsername(username).subscribe(usuario => {
          this.authService.login(usuario);
          this.router.navigate(['/main/login']);
        });
      },
      error => {
        if (error.status === 400) {
          Swal.fire('Error', 'Registration unsuccessful: Bad request', 'error');
        } else {
          Swal.fire('Error', 'An unexpected error occurred', 'error');
        }
      }
    );
  }
}
