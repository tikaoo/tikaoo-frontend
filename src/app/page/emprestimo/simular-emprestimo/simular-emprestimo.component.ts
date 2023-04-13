import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-simular-emprestimo',
  templateUrl: './simular-emprestimo.component.html',
  styleUrls: ['./simular-emprestimo.component.css'],
})
export class SimularEmprestimoComponent {

  formularioEmprestimo: FormGroup;
  valorFinal = 0;
  relacionamento!: string;


  constructor(private fb: FormBuilder) {
    this.formularioEmprestimo = this.fb.group({
      valorInicial: [0, Validators.required],
      renda: [0, Validators.required]   });
      this.valorFinal
      this.relacionamento
  }


  determinarRelacionamento() {
    const renda = this.formularioEmprestimo.get('renda')?.value;
    if (renda >= 10000) {
      this.relacionamento = 'Ouro';
    } else if (renda >= 5000) {
      this.relacionamento = 'Prata';
    } else {
      this.relacionamento = 'Bronze';
    }
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
    this.determinarRelacionamento();
    this.valorFinal = this.calcularValorFinal(this.relacionamento, this.formularioEmprestimo.get('valorInicial')?.value, this.formularioEmprestimo.get('renda')?.value);
  }
}
