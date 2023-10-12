import { useSelector } from 'react-redux'

import Contato from '../../components/Contato'
import * as S from '../../styles/index'
import { RootReducer } from '../../store'

const ListaDeContatos = () => {
  const { itens } = useSelector((state: RootReducer) => state.contatos)
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  const filtraContatos = () => {
    let contatosFiltradosPorNome = itens

    if (termo !== undefined) {
      contatosFiltradosPorNome = contatosFiltradosPorNome.filter(
        (item) =>
          item.nome.toLocaleLowerCase().search(termo.toLocaleLowerCase()) >= 0
      )

      return contatosFiltradosPorNome
    } else {
      return itens
    }
  }

  const contatos = filtraContatos()

  const exibeResultadoFiltragem = (quantidade: number) => {
    const existePesquisa = termo !== ''
    let mensagem = ''

    if (existePesquisa) {
      mensagem = `${quantidade} de contatos encontrados por ${termo}`
    } else {
      mensagem = `Exibindo ${quantidade}`

      if (quantidade > 1) {
        mensagem += ' contatos'
      } else {
        mensagem += ' contato'
      }
    }

    return mensagem
  }

  const mensagem = exibeResultadoFiltragem(contatos.length)

  return (
    <S.MainContainer>
      <S.Titulo as="p">{mensagem}</S.Titulo>
      <ul>
        {contatos.map((c) => (
          <li key={c.numero}>
            <Contato nome={c.nome} email={c.email} numero={c.numero} />
          </li>
        ))}
      </ul>
    </S.MainContainer>
  )
}

export default ListaDeContatos
