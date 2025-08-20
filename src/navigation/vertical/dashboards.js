// ** Icons Import
import { Home, Circle } from 'react-feather'

export default [
  {
    id: 'dashboards',
    title: 'Dashboards',
    icon: <Home size={20} />,
    badge: 'light-warning',
    children: [
       {
        id: 'brands',
        title: 'Brands',
        icon: <Circle size={12} />,
        navLink: '/admin/brands'
      }
    ]
  }
]
