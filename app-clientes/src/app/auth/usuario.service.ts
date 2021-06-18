import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Authdata } from './auth-data.model'

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  baseUrl: String = 'http://localhost:3000/api/clientes'

  constructor(private httpClient: HttpClient) { }

  criarUsuario(email: string, password: string) {
    const authData: Authdata = {
      email: email,
      password: password
    }
    this.httpClient.post(`${this.baseUrl}/signup`, authData)
    .subscribe(
      resposta => console.log(resposta)
    )
  }
}
