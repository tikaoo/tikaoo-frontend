import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICliente } from 'src/app/model/Cliente';
import { ClienteHttpService } from 'src/app/service/ClienteHttpService ';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atualizar-clientes',
  templateUrl: './atualizar-clientes.component.html',
  styleUrls: ['./atualizar-clientes.component.css']
})
export class AtualizarClientesComponent {

  clienteForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    logradouro:['',Validators.required],
    cep:['',Validators.required],
    rendaMensal:[0,Validators.required],
    numero:[0,Validators.required],
    cpf: [0,[
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(11),
        ]],
        cidade:['',Validators.required,],
        bairro:['',Validators.required],
        uf:['',Validators.required]

      })

    constructor(
      private fb: FormBuilder,
      private clienteHttpService: ClienteHttpService,
      private route: ActivatedRoute,
      private router:Router
    ) { }

    cpfCliente=0

  ngOnInit() {
      this.cpfCliente = Number(this.route.snapshot.paramMap.get('cpf'));
      if (this.cpfCliente) {
        this.clienteHttpService.getClienteCpf(this.cpfCliente).subscribe((cliente: ICliente) => {

          this.clienteForm.setValue({
            nome:cliente.nome,
            logradouro:cliente.logradouro,
            cep:cliente.cep,
            rendaMensal:cliente.rendaMensal,
            numero:cliente.numero,
            cpf:cliente.cpf,
            cidade:cliente.cidade,
            uf:cliente.uf,
            bairro:cliente.bairro

          })
        });
      }}
atualizar() {
  const livro: ICliente = this.clienteForm.value as ICliente;
  this.clienteHttpService.updateCliente(livro).subscribe(result => {
    Swal.fire(
      'Sucesso!',
      'Cliente atualizado com sucesso',
      'success'
    )
    this.router.navigateByUrl('/clientes')
  }, () => {
    Swal.fire(
    'Erro!',
    'Falha ao atualizar cliente.',
    'error'
  )
  });
}


}
