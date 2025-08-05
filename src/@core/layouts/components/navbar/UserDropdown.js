// ** React Imports
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import { Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'

const UserDropdown = () => {
  const navigate = useNavigate()

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (isUserLoggedIn()) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  const handleLogout = () => {
    // Clear localStorage (or sessionStorage if used)
    localStorage.removeItem('userData')
    localStorage.removeItem('accessToken') // Replace with your token key if different

    // Redirect to login
    navigate('/login')
  }

  const userAvatar = (userData && userData.avatar) || defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{userData?.username || 'John Doe'}</span>
          <span className='user-status'>{userData?.role || 'Admin'}</span>
        </div>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag='a' href='/' onClick={handleLogout}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
