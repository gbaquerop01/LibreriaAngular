class Address {
  direccion: string;
  planta: string;
  puerta: string;
  ciudad: string;

  constructor(direccion: string, planta: string, puerta: string, ciudad: string) {
    this.direccion = direccion;
    this.planta = planta;
    this.puerta = puerta;
    this.ciudad = ciudad;
  }
}

export class Usuario {
  username: string;
  email: string;
  password: string;
  role: number;
  address: Address;

  constructor(username: string, email: string, password: string, role: number, address: Address) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.address = address;
  }

  setRole(role: number): void {
    this.role = role;
  }
}
