import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LibrosService} from '../../services/libros.service';
import {Libro} from '../../core/models/Libro';
import {LibroSingleton} from '../../singleton/LibroSingleton';
import {AuthService} from '../../services/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-libro',
  standalone: false,

  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})
export class LibroComponent implements OnInit {

  librosArray: Libro[] = [];
  libroSelected: Libro = new Libro();
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private LibrosService: LibrosService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.LibrosService.getLibros().subscribe((libros: Libro[]) => {
      this.librosArray = libros;
      console.log(libros);
    });
    this.isLoggedIn = this.authService.isLoggedIn();
    this.isAdmin = this.authService.isAdmin();
  }

  getPortada(libro: Libro) {
    if (!libro.imgName.includes(".jpg") && !libro.imgName.includes(".png")) {
      return `assets/images/libros.png`;
    }
    if (libro.imgName.includes("http") || libro.imgName.includes("data:")) {
      return libro.imgName;
    }

    return `assets/images/${libro.imgName}`;
  }

  getLibroData(libro: Libro) {
    this.libroSelected = libro;
    LibroSingleton.getInstance().setLibro(libro);
  }

  checkForLibroSelected(libro: Libro) {
    return this.libroSelected.nombre != "" && this.libroSelected.nombre == libro.nombre;
  }

  confirmDelete(libro: Libro) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: '¿Estas seguro de que quieres eliminar este libro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteBook(libro);
      }
    });
  }

  deleteBook(libro: Libro) {
    this.LibrosService.deleteLibro(libro).subscribe((response: boolean) => {
      if (response) {
        window.location.reload();
      }
    });
  }

  nuevoLibro() {
    LibroSingleton.getInstance().setLibro(new Libro());
    this.router.navigate(['/main/nuevo-libro']);

  }

  checkForLibroInCarrito(libro: Libro) {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].nombre == libro.nombre) {
        return true;
      }
    }
    return false;
  }

  saveLibroInCarrito(libro: Libro) {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    carrito.push(libro);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  checkLibroQuantity(libro: Libro) {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    return carrito.filter((item: { id: number; }) => item.id === libro.id).length >= libro.cantidad;
  }
}
