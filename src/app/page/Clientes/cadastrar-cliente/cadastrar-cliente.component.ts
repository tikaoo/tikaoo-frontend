import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICanDeactivate } from 'src/app/model/CanDeactivate ';
import { ICliente } from 'src/app/model/Cliente';
import { ClienteHttpService } from 'src/app/service/ClienteHttpService ';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-cliente',
  templateUrl: './cadastrar-cliente.component.html',
  styleUrls: ['./cadastrar-cliente.component.css'],
})
export class CadastrarClienteComponent implements ICanDeactivate {
  private dirty: boolean = false;

  clienteForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    logradouro: ['', Validators.required],
    cep: ['', Validators.required],
    rendaMensal: [0, Validators.required],
    numero: [0, Validators.required],
    cpf: [0, [Validators.required, Validators.minLength(11)]],
    cidade: ['', Validators.required],
    bairro: ['', Validators.required],
    uf: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private clienteHttpService: ClienteHttpService,
    private router: Router
  ) {}

  cadastrar() {
    const cliente: ICliente = this.clienteForm.value as ICliente;
    this.clienteHttpService.createCliente(cliente).subscribe(
      () => {
        Swal.fire('Sucesso!', 'Cliente cadastrado com sucesso', 'success');
        this.router.navigateByUrl('/clientes');
        this.dirty = false;
      },
      (error) => {
        if (error.status === 500) {
          Swal.fire('Erro!', 'CPF já cadastrado.', 'error');
        } else if (error.status === 409) {
          Swal.fire('Erro!', 'CPF Inválido', 'error');
        } else {
          Swal.fire('Erro!', 'Falha ao cadastrar cliente.', 'error');
        }
      }
    );
  }

  completarEndereco() {
    const cep = this.clienteForm.get('cep')?.value;
    this.clienteHttpService.getCep(cep).subscribe((cepData: any) => {
      this.clienteForm.patchValue({
        cidade: cepData.localidade,
        bairro: cepData.bairro,
        uf: cepData.uf,
        logradouro: cepData.logradouro,
      });
    });
  }
  dirtyInput() {
    this.dirty = true;
  }
  mudarRota() {
    if (this.dirty) {
      return new Promise<boolean>((resolve) => {
        Swal.fire({
          title: 'Tem certeza que deseja sair dessa página?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim',
          cancelButtonText: 'Não',
        }).then((result) => {
          if (result.isConfirmed) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    } else {
      return Promise.resolve(true);
    }
  }
  desativarGuard() {
    return this.mudarRota();
  }
}
