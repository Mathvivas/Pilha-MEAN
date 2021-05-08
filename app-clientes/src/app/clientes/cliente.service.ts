import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Cliente } from "./cliente.model";

@Injectable({providedIn: 'root'})
export class ClienteService {
  private clientes: Cliente[] = []
  private listaClientesAtualizada = new Subject <Cliente[]>()

  getClientes(): Cliente[] {
    return [...this.clientes]
  }

  adicionarCliente(nome: string, fone: string, email: string) {
    const cliente: Cliente = { nome, fone, email }
    this.clientes.push(cliente)
    // clientes = [1, 2, 3] => ...clientes = 1, 2, 3 -> Extrai os elementos da lista
    this.listaClientesAtualizada.next([...this.clientes])   // Extraiu os elementos e colocou em outra lista (cópia)
  }

  getListaDeClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable()
  }
}
