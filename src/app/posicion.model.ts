export class Posicion {
    latitud: number | undefined;
    longitud: number | undefined;

    constructor(latitud: number | undefined, longitud: number | undefined) {
        {
            this.latitud = latitud;
            this.longitud = longitud;
        }
    }
}
