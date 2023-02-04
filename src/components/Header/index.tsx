import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/Logo.svg'
import { HeaderContainer } from './styles'
export const Header = () => {
  return (
    <HeaderContainer>
      <img src={Logo} alt="" />

      <nav>
        <NavLink to="/">
          <Timer size={24} />
        </NavLink>
        <NavLink to="history">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
