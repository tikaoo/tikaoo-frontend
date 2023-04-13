import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { ConfirmExitGuard } from './guard/confirm-exit.guard';
import { AtualizarClientesComponent } from './page/Clientes/atualizar-clientes/atualizar-clientes.component';
import { CadastrarClienteComponent } from './page/Clientes/cadastrar-cliente/cadastrar-cliente.component';
import { ListarClientesComponent } from './page/Clientes/listar-clientes/listar-clientes.component';
import { SimularEmprestimoComponent } from './page/emprestimo/simular-emprestimo/simular-emprestimo.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },

  {
    path: 'home',
    component: SidebarComponent,
  },
  {
    path: 'clientes/cadastrar',
    component: CadastrarClienteComponent,
    canDeactivate: [
      ConfirmExitGuard
    ]
  },
  {
    path: 'clientes/simular',
    component: SimularEmprestimoComponent,
  },
  {
    path: 'clientes/:cpf',
    component: AtualizarClientesComponent,
  },
  {
    path: 'clientes',
    component: ListarClientesComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
