import { Libro } from './Libro';
import {Usuario} from './usuario/Usuario';

export interface Factura {
  fecha: string;
  totalFactura: number;
  usuario: Usuario;
  libros: Libro[];
}
