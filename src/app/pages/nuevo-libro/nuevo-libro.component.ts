import {Component, OnInit, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Recurso} from '../../core/models/Recurso';
import {Libro} from '../../core/models/Libro';
import {AutoresService} from '../../services/autores.service';
import {TemasService} from '../../services/temas.service';
import {EdicionesService} from '../../services/ediciones.service';
import {FormatosService} from '../../services/formatos.service';
import {LibrosService} from '../../services/libros.service';
import {LibroSingleton} from '../../singleton/LibroSingleton';

@Component({
  selector: 'app-nuevo-libro',
  standalone: false,
  templateUrl: './nuevo-libro.component.html',
  styleUrl: './nuevo-libro.component.css'
})
export class NuevoLibroComponent implements OnInit {
  libroFormulario: FormGroup;

  autores: Recurso[] | undefined = [];
  temas: Recurso[] | undefined = [];
  ediciones: Recurso[] | undefined = [];
  formatos: Recurso[] | undefined = [];

  libro: Libro = new Libro();

  protected modification: boolean = false;
  displayedImage: any;

  constructor(private fb: FormBuilder, private autoresService: AutoresService, private temasService: TemasService, private edicionesService: EdicionesService, private formatosService: FormatosService, private librosService: LibrosService) {
    this.libroFormulario = this.fb.group({});
  }

  ngOnInit(): void {
    this.libroFormulario = this.fb.group({
      nombre: ['', Validators.required],
      isbn: ['', [Validators.required, Validators.minLength(13)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      autor: ['', Validators.required],
      tema: ['', Validators.required],
      edicion: ['', Validators.required],
      formato: ['', Validators.required],
      imgName: ['']
    });
    this.getDataRecursos().then(() => {});
    this.setFormValues();
    this.validateImageUrl(this.libroFormulario.get('imgName')?.value).then(isValid => {
      this.displayedImage = isValid ? this.libroFormulario.get('imgName')?.value : 'assets/images/libros.png';
    });
  }

  setFormValues() {
    const libro = LibroSingleton.getInstance().getLibro();
    if (libro.nombre == "") {
      return;
    }
    console.log(libro);
    this.modification = true;
    this.libroFormulario.patchValue({
      nombre: libro.nombre || '',
      isbn: libro.ISBN || '',
      precio: libro.precio || 0,
      cantidad: libro.cantidad || 0,
      autor: libro.autor || '',
      tema: libro.tema || '',
      edicion: libro.edicion || '',
      formato: libro.formato || '',
      imgName: libro.imgName || ''
    });
  }


  isValidField(key: string) {
    return this.libroFormulario.get(key)?.invalid;
  }

  saveBook() {
    this.adapterFormToLibro();
    this.librosService.postLibro(this.libro).subscribe((response) => {
    });
  }

  getDataRecursos(): Promise<void> {
    return Promise.all([
      this.autoresService.getAutores().toPromise(),
      this.temasService.getTemas().toPromise(),
      this.edicionesService.getEdiciones().toPromise(),
      this.formatosService.getFormatos().toPromise()
    ]).then(([autores, temas, ediciones, formatos]) => {
      this.autores = autores;
      this.temas = temas;
      this.ediciones = ediciones;
      this.formatos = formatos;
    }).catch(error => {
      console.error('Error fetching data', error);
    });
  }

  adapterFormToLibro() {
    this.libro.nombre = this.libroFormulario.get('nombre')?.value;
    this.libro.ISBN = this.libroFormulario.get('isbn')?.value;
    this.libro.precio = this.libroFormulario.get('precio')?.value;
    this.libro.autor = this.libroFormulario.get('autor')?.value;
    this.libro.tema = this.libroFormulario.get('tema')?.value;
    this.libro.edicion = this.libroFormulario.get('edicion')?.value;
    this.libro.formato = this.libroFormulario.get('formato')?.value;
    this.libro.imgName = this.libroFormulario.get('imgName')?.value;
    this.libro.cantidad = this.libroFormulario.get('cantidad')?.value;
  }

  updateBook() {
    LibroSingleton.getInstance().setLibro(new Libro());
    this.adapterFormToLibro();
    console.log(this.libro);
    this.librosService.putLibro(this.libro).subscribe((response) => {});
  }

  async updateImage($event: Event) {
    if (event == null) {
      this.displayedImage = 'assets/images/libros.png';
      return;
    }
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const isValidImage = await this.validateImageUrl(inputValue); // Método asíncrono
    if (isValidImage) {
      this.displayedImage = inputValue;
    } else {
      this.displayedImage = 'assets/images/libros.png';
    }
  }

  validateImageUrl(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }
}
