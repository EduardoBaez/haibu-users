import { Address } from './address'

export class User {
    constructor(
        public id: string,
        public nombre: string,
        public apellido: string,
        public telefono: number,
        public rut: string,
        public fechaNacimiento: Date,
        public direccion: Address,
        public activo: number
    ) { }
}