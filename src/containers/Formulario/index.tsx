import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { BotaoSalvar, Campo, MainContainer, Titulo } from '../../styles'
import { Form } from './styled'
import { cadastrar } from '../../store/reducers/contatos'

const Formulario = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [numero, setNumero] = useState(0)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')

  const cadastrarContato = (e: FormEvent) => {
    e.preventDefault()

    dispatch(
      cadastrar({
        nome,
        numero,
        email
      })
    )
    navigate('/')
  }

  return (
    <MainContainer>
      <Titulo>Novo Contato</Titulo>
      <Form onSubmit={cadastrarContato}>
        <Campo
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          type="text"
          placeholder="Titulo"
        />
        <Campo
          value={numero}
          onChange={(e) => setNumero(parseInt(e.target.value))}
          type="number"
          placeholder="Numero do Contato"
        ></Campo>
        <Campo
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email do conatto"
        ></Campo>
        <BotaoSalvar type="submit">Cadastrar</BotaoSalvar>
      </Form>
    </MainContainer>
  )
}

export default Formulario
