class Autor {
  id: number;
  nombre: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
  }
}

class Temas {
  id: number;
  nombre: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
  }
}

class Edicion {
  id: number;
  nombre: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
  }
}

class Formato {
  id: number;
  nombre: string;

  constructor() {
    this.id = 0;
    this.nombre = '';
  }
}

export class Libro {
  id: number;
  nombre: string;
  autor: Autor;
  tema: Temas;
  precio: number;
  edicion: Edicion;
  formato: Formato;
  ISBN: string;
  imgName: string;
  cantidad: number;

  constructor() {
    this.id = 0;
    this.nombre = '';
    this.autor = new Autor();
    this.tema = new Temas();
    this.precio = 0;
    this.edicion = new Edicion();
    this.formato = new Formato();
    this.ISBN = '';
    this.imgName = '';
    this.cantidad = 0;
  }

}
