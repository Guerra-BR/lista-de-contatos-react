import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import * as S from './styles'
import { remover, editar } from '../../store/reducers/contatos'
import ContatoClass from '../../models/Contato'
import { Botao, BotaoSalvar } from '../../styles/index'

type Props = ContatoClass

const Contato = ({
  nome: nomeOriginal,
  numero: numeroOriginal,
  email: emailOriginal,
  id
}: Props) => {
  const [estaEditando, setEstaEditando] = useState(false)
  const dispatch = useDispatch()
  const [numero, setNumero] = useState(0)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (numeroOriginal > 0) {
      setNumero(numeroOriginal)
    }
    if (nomeOriginal.length > 0) {
      setNome(nomeOriginal)
    }
    if (emailOriginal.length > 0) {
      setEmail(emailOriginal)
    }
  }, [numeroOriginal, nomeOriginal, emailOriginal])

  function cancelarEdicao() {
    setEstaEditando(false)
    setNumero(numeroOriginal)
    setEmail(emailOriginal)
    setNome(nomeOriginal)
  }

  return (
    <S.Card>
      <label htmlFor="titulo">
        <S.Titulo>
          {estaEditando && <em>Editando: </em>}
          {nome}
        </S.Titulo>
      </label>
      {estaEditando && (
        <S.Descricao
          type="text"
          disabled={!estaEditando}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      )}
      <S.Descricao
        type="tel"
        disabled={!estaEditando}
        value={numero}
        onChange={(e) => {
          setNumero(parseInt(e.target.value))
          console.log(numero)
        }}
      />
      <S.Descricao
        type="text"
        disabled={!estaEditando}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <S.BarraAcoes>
        {estaEditando ? (
          <>
            <BotaoSalvar
              onClick={() => {
                dispatch(
                  editar({
                    nome,
                    numero,
                    email,
                    id
                  })
                )
                setEstaEditando(false)
              }}
            >
              Salvar
            </BotaoSalvar>
            <S.BotaoCancelarRemover onClick={cancelarEdicao}>
              Cancelar
            </S.BotaoCancelarRemover>
          </>
        ) : (
          <>
            <Botao onClick={() => setEstaEditando(true)}>Editar</Botao>
            <S.BotaoCancelarRemover onClick={() => dispatch(remover(id))}>
              Remover
            </S.BotaoCancelarRemover>
          </>
        )}
      </S.BarraAcoes>
    </S.Card>
  )
}

export default Contato
