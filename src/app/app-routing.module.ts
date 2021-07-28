import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ClientesListagemComponent } from './clientes-listagem/clientes-listagem.component';

const routes: Routes = [
  { path: '', component: CadastroComponent },
  { path: 'listagem', component: ClientesListagemComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }