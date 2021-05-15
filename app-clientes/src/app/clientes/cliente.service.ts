import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Cliente } from "./cliente.model";
import { map } from 'rxjs/operators'

@Injectable({providedIn: 'root'})
export class ClienteService {
  private clientes: Cliente[] = []

  constructor(private httpClient: HttpClient) {

  }

  private listaClientesAtualizada = new Subject <Cliente[]>()

  getClientes(): void {
    this.httpClient.get<{mensagem: string, clientes: Cliente[]}>('http://localhost:3000/api/clientes')
    .pipe(map((dados) => {
      return dados.clientes.map(cliente => {
        return {
          id: cliente._id,
          nome: cliente.nome,
          fone: cliente.fone,
          email: cliente.email
        }
      })
    }))
    .subscribe((clientes) => {
      this.clientes = clientes
      this.listaClientesAtualizada.next([...this.clientes])
    })
  }

  adicionarCliente(nome: string, fone: string, email: string) {
    const cliente: Cliente = { nome, fone, email }
    this.httpClient.post<{mensagem: string, id: string}>('http://localhost:3000/api/clientes', cliente)
    .subscribe((dados) => {
      this.clientes.push(cliente)
      // clientes = [1, 2, 3] => ...clientes = 1, 2, 3 -> Extrai os elementos da lista
      this.listaClientesAtualizada.next([...this.clientes])   // Extraiu os elementos e colocou em outra lista (cópia)
    })
  }

  getListaDeClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable()
  }

  removerCliente(id: string): void {
    this.httpClient.delete(`http://localhost:3000/api/clientes/${id}`).subscribe(() => {
      console.log(`Cliente de id ${id} removido`)
      this.clientes = this.clientes.filter(cliente => cliente.id !== id)
      this.listaClientesAtualizada.next([...this.clientes])
    })
  }

  getCliente(idCliente: string) {
    return {...this.clientes.find((cli) => cli.id === idCliente)}
  }

  atualizarCliente(id: string, nome: string, fone: string, email: string) {
    const cliente: Cliente = { nome, fone, email }
    this.httpClient.put(`http://localhost:3000/api/clientes/${id}`, cliente)
    .subscribe((res) => console.log(res))
  }
}
