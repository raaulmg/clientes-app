import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public titulo: string = '';
  public cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.cargarCliente();
  }
  
  cargarCliente(): void {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if(id) {
        this.clienteService.getCliente(id).subscribe((cliente) => {
          this.cliente = cliente;
        });
      }
    });
  }

  create(): void {
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe( (cliente) => {
      this.router.navigate(['/clientes']);
      /* Libreria para mostrar alertas */
      swal.fire("Nuevo cliente", `El cliente ${cliente.nombre} ha sido creado con éxito`, 'success');
    });
  }

  update():void {
    this.clienteService.update(this.cliente).subscribe((response) => {
      this.router.navigate(['/clientes']);
      swal.fire("Cliente modificado", `${response.mensaje}: ${response.cliente.nombre}`, 'success');
    });
  }

}