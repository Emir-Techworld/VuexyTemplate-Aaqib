import { Row, Col } from 'reactstrap'
import CompanyTable from './CompanyTable'

import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'

const EcommerceDashboard = () => {
  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col lg='8' xs='12'>
          <CompanyTable />
        </Col>
      </Row>
    </div>
  )
}

export default EcommerceDashboard
