import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICliente } from 'src/app/model/Cliente';
import { ClienteHttpService } from 'src/app/service/ClienteHttpService ';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-clientes',
  templateUrl: './listar-clientes.component.html',
  styleUrls: ['./listar-clientes.component.css'],
})
export class ListarClientesComponent {

  clientes: ICliente[] = [];
  
  constructor(
    private clienteHttpService: ClienteHttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recoverClientes();
  }

  delete(cpf: number): void {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este cliente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteHttpService.deleteCliente(cpf).subscribe(
          () => {
            Swal.fire('Sucesso!', 'Cliente deletado com sucesso', 'success');
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/clientes']);
              });
          },
          (error) => {
            Swal.fire('Erro!', 'Falha ao excluir cliente!', 'error');
          }
        );
      }
    });
  }

  recoverClientes() {
    this.clienteHttpService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
}
