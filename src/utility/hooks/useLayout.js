// ** React Imports
import { useEffect, useState } from 'react'

export const useLayout = () => {
  const [layout, setLayout] = useState('vertical')
  const [lastLayout, setLastLayout] = useState('vertical')

  const breakpoint = 1200

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= breakpoint && lastLayout !== 'vertical' && layout !== 'vertical') {
        setLayout('vertical')
      }
      if (window.innerWidth >= breakpoint && lastLayout !== layout) {
        setLayout(lastLayout)
      }
    }

    if (window.innerWidth < breakpoint) {
      setLayout('vertical')
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [layout, lastLayout])

  return { layout, setLayout, lastLayout, setLastLayout }
}
