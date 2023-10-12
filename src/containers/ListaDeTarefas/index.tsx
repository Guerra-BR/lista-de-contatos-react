import { useSelector } from 'react-redux'

import Tarefa from '../../components/Tarefa'
import * as S from '../../styles/index'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefas = () => {
    let tarefasFiltradas = itens

    if (termo !== undefined) {
      tarefasFiltradas = tarefasFiltradas.filter(
        (item) =>
          item.titulo.toLocaleLowerCase().search(termo.toLocaleLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltradas = tarefasFiltradas.filter(
          (item) => item.status === valor
        )
      }

      return tarefasFiltradas
    } else {
      return itens
    }
  }

  const tarefas = filtraTarefas()

  const exibeResultadoFiltragem = (quantidade: number) => {
    let mensagem = ''
    const complementação =
      termo != undefined && termo.length >= 0 ? `e "${termo}"` : ''

    if (criterio === 'todas') {
      mensagem = `${quantidade} tarefas(s) encontrada(s) como: todas ${complementação}`
    } else {
      mensagem = `${quantidade} tarefa(s) encontrada(s) como: "${`${criterio} = ${valor}`}" ${complementação}`
    }

    return mensagem
  }

  const mensagem = exibeResultadoFiltragem(tarefas.length)

  return (
    <S.MainContainer>
      <S.Titulo as="p">{mensagem}</S.Titulo>
      <ul>
        {tarefas.map((t) => (
          <li key={t.titulo}>
            <Tarefa
              id={t.id}
              descricao={t.descricao}
              status={t.status}
              prioridade={t.prioridade}
              titulo={t.titulo}
            />
          </li>
        ))}
      </ul>
    </S.MainContainer>
  )
}

export default ListaDeTarefas
