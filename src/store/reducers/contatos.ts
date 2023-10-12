import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contato from '../../models/Contato'

type ContatosState = {
  itens: Contato[]
}

const initialState: ContatosState = {
  itens: [
    {
      nome: 'teste',
      numero: 12456789,
      email: 'teste@gmail.com'
    }
  ]
}

const contatoSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((contato) => contato.numero !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Contato>) => {
      const indexDaTarefa = state.itens.findIndex(
        (c) => c.numero === action.payload.numero
      )

      if (indexDaTarefa >= 0) {
        state.itens[indexDaTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Contato>) => {
      const contatoJaExiste =
        state.itens.find(
          (c) => c.nome.toLowerCase() === action.payload.nome.toLowerCase()
        ) ||
        state.itens.find((c) => c.numero === action.payload.numero) ||
        state.itens.find(
          (c) =>
            c.email.toLocaleLowerCase() ===
            action.payload.email.toLocaleLowerCase()
        )

      if (contatoJaExiste) {
        alert('Já existe um contato com este algumas destas informações')
      } else {
        const novoContato = {
          ...action.payload
        }
        state.itens.push(novoContato)
      }
    }
  }
})

export const { remover, editar, cadastrar } = contatoSlice.actions
export default contatoSlice.reducer
