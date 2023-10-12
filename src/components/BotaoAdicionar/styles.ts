import styled from 'styled-components'
import { Link } from 'react-router-dom'
import variaveis from '../../styles/variaveis'

export const Circulo = styled(Link)`
  display: flex;
  height: 64px;
  width: 64px;
  background-color: ${variaveis.verde};
  color: white;
  font-weight: bold;
  position: fixed;
  right: 40px;
  bottom: 40px;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  border-radius: 50%;
  text-decoration: none;
`
