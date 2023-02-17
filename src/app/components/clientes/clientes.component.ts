import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  /* En los parametros del constructor se pueden definir variables para toda la clase sin necesidad de crearlas antes */
  constructor(private clientesService: ClienteService) {

  }
  
  /* cuando se inicia el componente se ejecuta */
  ngOnInit() {
    /* aqui estaria el observable siendo observado por el observador */
    this.clientesService.getClientes().subscribe( (clientesConsultados) => this.clientes = clientesConsultados );
  }

}