import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
/* of es un metodo de construccion para crear el objeto observable (lo retorna) y el observable seria el que representa el flujo reactivo  */
import { Observable, of, catchError, throwError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
/* Forma 2 map */
// import { map } from 'rxjs/operators';

/* Decorador (es lo que indica que tipo de clase representa en Angular) Injectable es para clase de servicio representa logica de negocio
se puede injectar a otros componentes via inyeccion de dependecias
*/
@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  /* creamos la variable http desde el constructor e indicamos que es del tipo HttpClient */
  constructor(private http: HttpClient, private router: Router) { }

  /* patron de diseño observador tenemos un observable ej cliente y tenemos observadores que esperan un posible cambio en el cliente
  estos se subcriben al observable y si cambia su estado se indica a los observadores y se ejecuta un tipo de evento */
  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    // Indicamos la URL del EndPoint de la consulta de la api
    // y hacemos un Cast en el get<Cliente[]> indicando que lo que vamos a recibir por get se va a Castear a un array de clientes
    /* Forma 1 y la principal */

    return this.http.get<Cliente[]>(this.urlEndPoint);

     /* Forma 2 map */
    /* return this.http.get(this.urlEndPoint).pipe(
      map( response => response as Cliente[] )
    ); */
  }

  create(cliente: Cliente): Observable<Cliente>  {
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) =>  response.cliente as Cliente),
      catchError((e) => {
        console.error(e.error.mensaje);
        Swal.fire('Error al crear el cliente', e.error.mensaje, 'error');
        return throwError(() => {
          new Error(e);
        });
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError((e) => {
        console.error(e.error.mensaje);
        Swal.fire('Error al editar el cliente', e.error.mensaje, 'error');
        return throwError(() => {
          new Error(e);
        });
      })
    );
  }

  getCliente(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => {
          new Error(e); 
        });
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        console.error(e.error.mensaje);
        Swal.fire('Error al eliminar el cliente', e.error.mensaje, 'error');
        return throwError(() => {
          new Error(e);
        })
      })
    );
  }

}