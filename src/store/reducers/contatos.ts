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
      email: 'teste@gmail.com',
      id: 1
    }
  ]
}

const contatoSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((contato) => contato.id !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Contato>) => {
      const indexDoCtt = state.itens.findIndex(
        (c) => c.id === action.payload.id
      )

      if (indexDoCtt >= 0) {
        state.itens[indexDoCtt] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contato, 'id'>>) => {
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
        const ultimoContato = state.itens[state.itens.length - 1]

        const novoContato = {
          ...action.payload,
          id: ultimoContato ? ultimoContato.id + 1 : 1
        }
        state.itens.push(novoContato)
      }
    }
  }
})

export const { remover, editar, cadastrar } = contatoSlice.actions
export default contatoSlice.reducer
