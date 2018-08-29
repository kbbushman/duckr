import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { container, navContainer, link } from './styles.css'
import { ModalContainer } from 'containers'

const NavLinks = ({isAuthed}) => {
  return isAuthed === true
    ? <ul>
      <li><Link className={link} to='/'>Home</Link></li>
    </ul>
    : null
}

const ActionLinks = ({isAuthed}) => {
  return isAuthed === true
    ? <ul>
      <li><ModalContainer /></li>
      <li><Link className={link} to='/logout'>Logout</Link></li>
    </ul>
    : <ul>
      <li><Link className={link} to='/'>Home</Link></li>
      <li><Link className={link} to='/login'>Login</Link></li>
    </ul>
}

const Navigation = ({isAuthed}) => {
  return (
    <div className={container}>
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed} />
        <ActionLinks isAuthed={isAuthed} />
      </nav>
    </div>
  )
}

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired,
}

export default Navigation
