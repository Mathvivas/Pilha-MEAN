import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Cliente } from "./cliente.model";

@Injectable({providedIn: 'root'})
export class ClienteService {
  private clientes: Cliente[] = []

  constructor(private httpClient: HttpClient) {

  }

  private listaClientesAtualizada = new Subject <Cliente[]>()

  getClientes(): void {
    this.httpClient.get<{mensagem: string, clientes: Cliente[]}>('http://localhost:3000/api/clientes').subscribe((dados) => {
      this.clientes = dados.clientes
      this.listaClientesAtualizada.next([...this.clientes])
    })
  }

  adicionarCliente(nome: string, fone: string, email: string) {
    const cliente: Cliente = { nome, fone, email }
    this.httpClient.post<{mensagem: string}>('http://localhost:3000/api/clientes', cliente).subscribe((dados) => {
      this.clientes.push(cliente)
      // clientes = [1, 2, 3] => ...clientes = 1, 2, 3 -> Extrai os elementos da lista
      this.listaClientesAtualizada.next([...this.clientes])   // Extraiu os elementos e colocou em outra lista (cópia)
    })
  }

  getListaDeClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable()
  }
}
