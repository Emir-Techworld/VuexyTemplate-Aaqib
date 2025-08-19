// ** React Imports
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { ArrowUp } from 'react-feather'

// ** Reactstrap Imports
import { Navbar, Button } from 'reactstrap'

// ** Configs
import themeConfig from '../layouts/configs/themeConfig'

// ** Custom Components
import ScrollToTop from '@components/scrolltop'
import FooterComponent from './components/footer'
import NavbarComponent from './components/navbar'
import SidebarComponent from './components/menu/vertical-menu'

// ** Hooks
import { useLayout } from '@hooks/useLayout'

// ** Styles
import '@styles/base/core/menu/menu-types/vertical-menu.scss'
import '@styles/base/core/menu/menu-types/vertical-overlay-menu.scss'

const VerticalLayout = props => {
  const { menu, navbar, footer, children, menuData } = props

  // ** Layout Settings (replace this if needed from layout context)
  const { navbarType, footerType, navbarColor } = useLayout()

  // ** States
  const [isMounted, setIsMounted] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [menuCollapsed, setMenuCollapsed] = useState(false)
  const [contentWidth, setContentWidth] = useState('full')
  const [isHidden, setIsHidden] = useState(false)

  const location = useLocation()

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  // ** Close menu on route change for mobile
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false)
    }
  }, [location])

  // ** Track window size
  useEffect(() => {
    window.addEventListener('resize', handleWindowWidth)
    return () => window.removeEventListener('resize', handleWindowWidth)
  }, [])

  // ** Mount flag
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const footerClasses = {
    static: 'footer-static',
    sticky: 'footer-fixed',
    hidden: 'footer-hidden'
  }

  const navbarWrapperClasses = {
    floating: 'navbar-floating',
    sticky: 'navbar-sticky',
    static: 'navbar-static',
    hidden: 'navbar-hidden'
  }

  const navbarClasses = {
    floating: contentWidth === 'boxed' ? 'floating-nav container-xxl' : 'floating-nav',
    sticky: 'fixed-top',
    static: 'navbar-static-top',
    hidden: 'd-none'
  }

  const bgColorCondition = navbarColor !== '' && navbarColor !== 'light' && navbarColor !== 'white'

  if (!isMounted) return null

  return (
    <div
      className={classnames(
        `wrapper vertical-layout ${navbarWrapperClasses[navbarType] || 'navbar-floating'} ${footerClasses[footerType] || 'footer-static'}`,
        {
          'vertical-menu-modern': windowWidth >= 1200,
          'menu-collapsed': menuCollapsed && windowWidth >= 1200,
          'menu-expanded': !menuCollapsed && windowWidth > 1200,
          'vertical-overlay-menu': windowWidth < 1200,
          'menu-hide': !menuVisibility && windowWidth < 1200,
          'menu-open': menuVisibility && windowWidth < 1200
        }
      )}
      {...(isHidden ? { 'data-col': '1-column' } : {})}
    >
      {!isHidden && (
        <SidebarComponent
          menu={menu}
          menuData={menuData}
          menuCollapsed={menuCollapsed}
          menuVisibility={menuVisibility}
          setMenuCollapsed={setMenuCollapsed}
          setMenuVisibility={setMenuVisibility}
        />
      )}

      <Navbar
        expand='lg'
        container={false}
        color={bgColorCondition ? navbarColor : undefined}
        className={classnames(
          `header-navbar navbar align-items-center ${navbarClasses[navbarType] || 'floating-nav'} navbar-shadow`
        )}
      >
        <div className='navbar-container d-flex content'>
          {navbar ? navbar({ setMenuVisibility }) : <NavbarComponent setMenuVisibility={setMenuVisibility} />}
        </div>
      </Navbar>

      {children}

      {/* Menu Overlay for Mobile */}
      <div
        className={classnames('sidenav-overlay', { show: menuVisibility })}
        onClick={() => setMenuVisibility(false)}
      ></div>

      {/* Footer */}
      <footer
        className={classnames(`footer footer-light ${footerClasses[footerType] || 'footer-static'}`, {
          'd-none': footerType === 'hidden'
        })}
      >
        {footer ? footer : <FooterComponent footerType={footerType} footerClasses={footerClasses} />}
      </footer>

      {/* Scroll To Top */}
      {themeConfig.layout.scrollTop === true && (
        <div className='scroll-to-top'>
          <ScrollToTop showOffset={300} className='scroll-top d-block'>
            <Button className='btn-icon' color='primary'>
              <ArrowUp size={14} />
            </Button>
          </ScrollToTop>
        </div>
      )}
    </div>
  )
}

export default VerticalLayout
