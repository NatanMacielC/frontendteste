import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ClientesListagemComponent } from './clientes-listagem/clientes-listagem.component';
import { ClientesService } from './clientes.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule, } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router'
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesListagemComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    AppRoutingModule

  ],
  providers: [ ClientesService, AppComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
