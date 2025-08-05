// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'

import PrivateRoute from '../router/PrivateRoute'

const VerticalLayout = props => {
  return (
    <PrivateRoute>
      <Layout menuData={navigation} {...props}>
        <Outlet />
      </Layout>
    </PrivateRoute>

  )
}

export default VerticalLayout
