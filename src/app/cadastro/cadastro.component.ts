import { Component } from '@angular/core';
import { ClientesService } from '../clientes.service';
import { Clientes } from '../nomes/clientes';
import { FormBuilder, FormControl, FormsModule, FormGroup, NgForm, Validators} from '@angular/forms';
import { OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TextMaskModule } from 'angular2-text-mask';


@Component({
  selector: 'app-root',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  
  title = 'clientes';
  baseURL = '/api/clientes';
  formCliente!: FormGroup;
  isSubmitted!: boolean;
  clientesList: any;
  clientes: any;

  constructor(private clientesService : ClientesService, 
    private http: HttpClient, 
    private fb: FormBuilder) {} 

    ngOnInit() {
      this.getAll();
      this.initForm();
      this.formCliente = this.fb.group({
        id: [0],
        nome: ['', Validators.required],
        cnpj: ['', Validators.required],
        email: ['', Validators.required],
        telefone: ['', Validators.required],
        razaoSocial: ['', Validators.required],
        is_active: [1],
      });
      this.getAll();
    }
  
    get fc() { return this.formCliente.controls; }
  
    initForm() {
      this.formCliente = this.fb.group({id: '', nome: ['', Validators.required ], cnpj: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      razaoSocial: ['', Validators.required]})
    }

  save(){
    this.isSubmitted = true;
    if (this.formCliente.invalid) {
      return;
    } else{
      let id = this.formCliente.controls.id.value;
      if(!id) {
        this.http.post(this.baseURL, this.formCliente.value).subscribe(() => {
          alert('Criado com sucesso');
          this.reset();
        });
        this.getAll();
      } else {
        this.http.put(this.baseURL+'/'+id, this.formCliente.value).subscribe(() => {
          alert('Atualizado com sucesso');
          this.reset;
        });
        this.getAll();
      }
    }
  }

  reset() {
    this.formCliente.reset();
    this.formCliente.controls.is_active.setValue(1);
    this.isSubmitted = false;

    this.getAll();
  }

  getAll() {
    this.http.get(this.baseURL).subscribe((result: any) => {
      this.clientesList = result;
    })
  }

  edit(id: any){
    if(id){
      const clientes = this.clientesList.find((x: { id: any; }) => x.id === id);
      if(!clientes) return;
      clientes.isReading = true;

      this.http.get(this.baseURL+'/'+id).subscribe((result: any) => {
        Object.keys(this.formCliente.controls).forEach(key => {
          this.formCliente.controls[key].setValue(result[key]);
        });
        clientes.isReading = false;
      });
    }
  }

  cleanForm() {
    this.formCliente.reset();
  }

  delete(id: any){
    var result = confirm('Quer deletar?');
    if (id && result){
      const clientes = this.clientesList.find((x: { id: any; }) => x.id === id);
      if (!clientes) return;
      clientes.isDeleting = true;

      this.http.delete(this.baseURL+'/'+id).subscribe(() => {
        clientes.isReading = false;
        this.reset
        alert('Removido com sucesso');
      });
      this.getAll();
    }
  }

}