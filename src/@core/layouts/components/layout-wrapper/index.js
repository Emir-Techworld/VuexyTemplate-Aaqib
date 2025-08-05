// ** React Imports
import { Fragment, useEffect, memo, useState } from 'react'

// ** Third Party Components
import classnames from 'classnames'

// ** Styles
import 'animate.css/animate.css'

const LayoutWrapper = ({ children, routeMeta }) => {
  // ** State (if needed)
  const [localContentWidth, setLocalContentWidth] = useState('full') // default to full width

  // ** App Layout condition
  const appLayoutCondition =
    routeMeta && routeMeta.layout === 'horizontal' && !routeMeta.appLayout

  const Tag = appLayoutCondition ? 'div' : Fragment

  // ** Apply routeMeta settings on mount
  useEffect(() => {
    if (routeMeta?.contentWidth) {
      setLocalContentWidth(routeMeta.contentWidth)
    }

    // You could handle other things like menuCollapsed/menuHidden here if needed
    // by using more local state or context

    // Cleanup logic if required
    return () => {
      setLocalContentWidth('full')
    }
  }, [routeMeta])

  return (
    <div
      className={classnames('app-content content overflow-hidden', {
        [routeMeta?.className]: routeMeta?.className
      })}
    >
      <div className='content-overlay'></div>
      <div className='header-navbar-shadow' />
      <div
        className={classnames({
          'content-wrapper': routeMeta && !routeMeta.appLayout,
          'content-area-wrapper': routeMeta && routeMeta.appLayout,
          'container-xxl p-0': localContentWidth === 'boxed'
        })}
      >
        <Tag {...(appLayoutCondition ? { className: 'content-body' } : {})}>{children}</Tag>
      </div>
    </div>
  )
}

export default memo(LayoutWrapper)
