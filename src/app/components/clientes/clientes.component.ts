import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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

  delete(cliente: Cliente):void {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea eliminar el cliente ${cliente.nombre} ${cliente.apellidos}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.clientesService.delete(cliente.id).subscribe(() => {
          this.clientes = this.clientes.filter((data) => { return data != cliente });
          swalWithBootstrapButtons.fire(
            'Borrado!',
            `El cliente ${cliente.nombre} ha sido eliminado.`,
            'success'
          )
        });

      }
    })

  }

}