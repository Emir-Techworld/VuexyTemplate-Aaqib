// ** React Imports
import { Fragment } from 'react'
import { Row, Col } from 'reactstrap'
import '@styles/react/libs/tables/react-dataTable-component.scss'

import BrandTable from './BrandTable'

const Brands = () => {
    return (
        <Fragment>
            <Row>
                <Col sm='12'>
                    <BrandTable />
                </Col>
            </Row>
        </Fragment>
    )
}

export default Brands
