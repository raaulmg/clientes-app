import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
/* of es un metodo de construccion para crear el objeto observable (lo retorna) y el observable seria el que representa el flujo reactivo  */
import { Observable, of } from 'rxjs';

/* Decorador (es lo que indica que tipo de clase representa en Angular) Injectable es para clase de servicio representa logica de negocio
se puede injectar a otros componentes via inyeccion de dependecias
*/
@Injectable()
export class ClienteService {

  constructor() { }

  /* patron de diseño observador tenemos un observable ej cliente y tenemos observadores que esperan un posible cambio en el cliente
  estos se subcriben al observable y si cambia su estado se indica a los observadores y se ejecuta un tipo de evento */
  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}