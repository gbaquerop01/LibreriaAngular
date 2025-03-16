import {Libro} from '../core/models/Libro';

export class LibroSingleton {
  private static instance: LibroSingleton;
  private libro: Libro = new Libro();

  private constructor() {
  }

  public static getInstance(): LibroSingleton {
    if (!LibroSingleton.instance) {
      LibroSingleton.instance = new LibroSingleton();
    }
    return LibroSingleton.instance;
  }

  public getLibro(): Libro {
    return this.libro;
  }

  public setLibro(libro: Libro): void {
    this.libro = libro;
  }
}
