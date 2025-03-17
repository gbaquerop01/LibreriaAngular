import {Component, OnInit} from '@angular/core';
import {Recurso} from '../../core/models/Recurso';
import {AutoresService} from '../../services/autores.service';
import Swal from 'sweetalert2';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-autores',
  standalone: false,

  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent implements OnInit {

  autores: Recurso[] = []
  nuevoAutor: string = "";

  constructor(private autoresService: AutoresService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.autoresService.getAutores().subscribe(autores => {
      this.autores = autores
    })
  }

  deleteAutor(autor: Recurso) {
    Swal.fire({
      title: '¿Seguro?',
      text: `Estas seguro de que quieres eliminar al autor '${autor.nombre}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.autoresService.deleteAutor(autor).subscribe(respuesta => {
          window.location.reload();
        });
      }
    });
  }

  saveAutor() {
    const autor: Recurso = {
      getNombre(): string {
        return this.nombre;
      },
      id: 0,
      nombre: this.nuevoAutor
    }

    this.autoresService.postAutor(autor).subscribe(respuesta => {
      console.log("Se ha guardado el autor correctamente")
    })
    window.location.reload();
  }

  updateAutor(autor: Recurso) {
  Swal.fire({
    title: 'Actualizar Autor',
    input: 'text',
    inputLabel: 'Nuevo nombre del autor',
    inputValue: autor.nombre,
    showCancelButton: true,
    confirmButtonText: 'Actualizar',
    cancelButtonText: 'Cancelar',
    preConfirm: (nuevoNombre) => {
      if (!nuevoNombre) {
        Swal.showValidationMessage('El nombre no puede estar vacío');
      }
      return nuevoNombre;
    }
  }).then((result) => {
    if (result.isConfirmed) {
      autor.nombre = result.value;
      this.autoresService.updateAutor(autor).subscribe(respuesta => {
        window.location.reload();
      });
    }
  });
}

  isAdmin() {
    return this.authService.isAdmin();
  }
}
