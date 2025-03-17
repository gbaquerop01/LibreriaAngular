import {Component, Input, OnInit} from '@angular/core';
import {Libro} from '../core/models/Libro';
import {CarritoService} from '../services/carrito.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-carrito',
  standalone: false,

  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  libros: Libro[] = [];
  cachedLibros: Libro[] = [];

  constructor(private carritoService: CarritoService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.libros = JSON.parse(localStorage.getItem('carrito') || '[]');

    function fillUniques(libros: Libro[]) {
      const uniqueLibros: Libro[] = [];
      const libroNames = new Set<string>();

      libros.forEach(libro => {
        if (!libroNames.has(libro.nombre)) {
          libroNames.add(libro.nombre);
          uniqueLibros.push(libro);
        }
      });

      return uniqueLibros;
    }

    this.cachedLibros = fillUniques(this.libros);
  }

  getPortada(libro: Libro) {
    if (!libro.imgName.includes('.jpg') && !libro.imgName.includes('.png')) {
      return `assets/images/libros.png`;
    }
    if (libro.imgName.includes('http') || libro.imgName.includes('data:')) {
      return libro.imgName;
    }

    return `assets/images/${libro.imgName}`;
  }

  comprar() {
    console.log("Cmprando")
    this.carritoService.createFactura(this.cachedLibros, this.authService.getLoggedInUser(), this.getTotalPrecio());
  }

  getTotalUnidades(): number {
    return this.libros.length;
  }

  getTotalPrecio(): number {
    return this.libros.reduce((total, libro) => total + libro.precio, 0);
  }

  deleteLibroInCarrito(libro: Libro) {
    this.libros = this.libros.filter(l => l.nombre !== libro.nombre);
    this.cachedLibros = this.cachedLibros.filter(l => l.nombre !== libro.nombre);
    localStorage.setItem('carrito', JSON.stringify(this.libros));
  }

  leerCantidadLibroCarrito(libro: Libro){
    let cantidad = 0;
    this.libros.forEach(l => {
      if(l.nombre === libro.nombre){
        cantidad++;
      }
    });
    return cantidad;
  }

  decrementarCantidad(libro: Libro) {
    let index = this.libros.findIndex(l => l.nombre === libro.nombre);
    if (index !== -1 && this.leerCantidadLibroCarrito(libro) > 1) {
      this.libros.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(this.libros));
    }
  }

  incrementarCantidad(libro: Libro) {
    if (this.leerCantidadLibroCarrito(libro) < libro.cantidad) {
      this.libros.push(libro);
      localStorage.setItem('carrito', JSON.stringify(this.libros));
    }
  }

  reloadCarrito(): void {
    this.cachedLibros = JSON.parse(localStorage.getItem('carrito') || '[]');
  }

}
