import {Component} from '@angular/core';
import {Recurso} from '../../core/models/Recurso';
import {AutoresService} from '../../services/autores.service';
import {TemasService} from '../../services/temas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema',
  standalone: false,

  templateUrl: './tema.component.html',
  styleUrl: './tema.component.css'
})
export class TemaComponent {
  temas: Recurso[] = []
  nuevoTema: string = "";

  constructor(private temasService: TemasService) {
  }

  ngOnInit(): void {
    this.temasService.getTemas().subscribe(temas => {
      this.temas = temas
      console.log(this.temas)
    })

  }

  saveTema() {
    const tema = new Recurso();
    tema.nombre = this.nuevoTema;
    this.temasService.saveTema(tema).subscribe((subscribe) => {
    })
    window.location.reload();
    console.log("Se ha guardado el tema correctamente")
  }

  deleteTema(tema: Recurso) {
    Swal.fire({
      title: '¿Seguro?',
      text: `Estas seguro de que quieres eliminar el tema '${tema.nombre}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.temasService.deleteTema(tema).subscribe(respuesta => {
          window.location.reload();
        });
      }
    });
  }
}
