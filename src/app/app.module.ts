import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { CadastrarClienteComponent } from './page/Clientes/cadastrar-cliente/cadastrar-cliente.component';
import { AtualizarClientesComponent } from './page/Clientes/atualizar-clientes/atualizar-clientes.component';
import { SimularEmprestimoComponent } from './page/emprestimo/simular-emprestimo/simular-emprestimo.component';
import { HttpClientModule } from '@angular/common/http';
import { ListarClientesComponent } from './page/Clientes/listar-clientes/listar-clientes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmExitGuard } from './guard/confirm-exit.guard';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CadastrarClienteComponent,
    AtualizarClientesComponent,
    SimularEmprestimoComponent,
    ListarClientesComponent,




  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, CommonModule,HttpClientModule,FormsModule, BrowserAnimationsModule ],
  providers: [ConfirmExitGuard],
  exports:[],

  bootstrap: [AppComponent],
})
export class AppModule {}
