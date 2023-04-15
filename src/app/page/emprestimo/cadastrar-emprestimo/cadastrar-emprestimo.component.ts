import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ICliente } from 'src/app/model/Cliente';
import { IEmprestimo } from 'src/app/model/Emprestimo';
import { ClienteHttpService } from 'src/app/service/ClienteHttpService ';
import { EmprestimoHttpService } from 'src/app/service/emprestimo-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar-emprestimo',
  templateUrl: './cadastrar-emprestimo.component.html',
  styleUrls: ['./cadastrar-emprestimo.component.css']
})
export class CadastrarEmprestimoComponent {
valorFinal=0
relacionamento=''
cpfCliente!:number

clienteForm: FormGroup;
emprestimoForm: FormGroup;


  checkboxValue = false;
  cpfNEcontrado = true;
  showForm = false;

  constructor(
    private clienteHttpService: ClienteHttpService,
    private emprestimoHttpService: EmprestimoHttpService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      rendaMensal:[0,Validators.required],
      cpf: [0,[
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(11),
        ],

      ],    });
    this.emprestimoForm = this.fb.group({
      relacionamento:["BRONZE"],
      valorInicial: [0, Validators.required],
      valorFinal: [0, Validators.required],
      dataInicial:["",Validators.required],
      dataFinal:["",Validators.required],
      rendaMensal:[0,Validators.required],


      })
  }

  ngOnInit() {
    this.cpfCliente = Number(this.route.snapshot.paramMap.get('cpf'));
    if (this.cpfCliente) {
      this.clienteHttpService.getClienteCpf(this.cpfCliente).subscribe((cliente: ICliente) => {

        this.clienteForm.patchValue({
         rendaMensal:cliente.rendaMensal,
        cpf:cliente.cpf


       })

      });
    }}


  determinarRelacionamento() {
    let relacionamento = this.emprestimoForm.get('relacionamento')?.value;
    const renda = this.clienteForm.get('renda')?.value;
    if (renda >= 10000) {
      relacionamento = 'OURO';
    } else if (renda >= 5000) {
      relacionamento = 'PRATA';
    } else {
      relacionamento = 'BRONZE';
    }
    return relacionamento
  }
  calcularValorFinal(
    relacionamento: string,
    valorInicial: number,
    renda: number
  ): number {
    let valorFinal: number;

    switch (true) {
      case renda >= 10000:
        relacionamento = 'OURO';
        break;
      case renda >= 5000 && renda < 10000:
        relacionamento = 'PRATA';
        break;
      default:
        relacionamento = 'BRONZE';
        break;
    }

    switch (relacionamento) {
      case 'BRONZE':
        valorFinal = valorInicial * 1.8;
        break;
      case 'PRATA':
        if (valorInicial > 5000) {
          valorFinal = valorInicial * 1.4;
        } else {
          valorFinal = valorInicial * 1.6;
        }
        break;
      case 'OURO':
        valorFinal = valorInicial * 1.3;

        break;
      default:
        valorFinal = valorInicial;
    }

    return valorFinal;
  }
  calcular() {
    let valorFinal: number;
    this.relacionamento = this.determinarRelacionamento();
    this.valorFinal = this.calcularValorFinal(
      this.emprestimoForm.get('relacionamento')?.value,
      this.emprestimoForm.get('valorInicial')?.value,
      this.emprestimoForm.get('rendaMensal')?.value
    );
  }
  cadastrar() {
    const emprestimo: IEmprestimo = this.emprestimoForm.value as IEmprestimo;
    const cpf =this.clienteForm.get('cpf')?.value;
    this.emprestimoHttpService.createEmprestimo(emprestimo,cpf).subscribe(result => {
      Swal.fire(
        'Sucesso',
        'Empréstimo cadastrado com sucesso',
        'success'
      )
      this.router.navigateByUrl('/emprestimos');
    }, error => {
      console.error(error);
    });
  }
}
