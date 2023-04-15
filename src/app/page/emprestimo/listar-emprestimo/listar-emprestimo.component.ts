import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICliente } from 'src/app/model/Cliente';
import { IEmprestimo } from 'src/app/model/Emprestimo';
import { EmprestimoHttpService } from 'src/app/service/emprestimo-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-emprestimo',
  templateUrl: './listar-emprestimo.component.html',
  styleUrls: ['./listar-emprestimo.component.css']
})
export class ListarEmprestimoComponent {
  clientes: ICliente[] = [];
  emprestimos: IEmprestimo[] = [];

  constructor(
    private emprestimoHttpService: EmprestimoHttpService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recoverEmprestimos();
  }

  recoverEmprestimos() {
    this.emprestimoHttpService.getEmprestimos().subscribe((emprestimo) => {
      this.emprestimos = emprestimo;
    });
  }

  deleteEmprestimo(cpf: number,id:number): void {
    Swal.fire({
      title: 'Tem certeza que deseja deletar este empréstimo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {
        this.emprestimoHttpService.deleteEmprestimo(cpf,id).subscribe(
          () => {
            Swal.fire('Sucesso!', 'Emprestimo deletado com sucesso', 'success');
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['/emprestimos']);
              });
          },
          () => {
            Swal.fire('Erro!', 'Falha ao excluir cliente!', 'error');
          }
        );
      }
    });
  }
}

