// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Plus } from 'react-feather'

// ** Table Data & Columns
import { GetAllBrandsApi } from '../../../api/brand'
import Brandscolumns from '../../../constants/columns/BrandColumns'
import CustomPagination from '../../components/CustomPagination'
import SearchFilter from '../../components/SearchFilter'
import useFilter from '../../../utility/hooks/useSearchFilter'

// ** Reactstrap Imports
import { Row, Card, Button, CardTitle, CardHeader } from 'reactstrap'

import AddBrandModal from './AddBrandModal'

const BrandTable = () => {
  // ** States

  const [modal, setModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [brands, setBrands] = useState([])
  const { searchValue, filteredData, handleFilter } = useFilter(brands, [])  // search filter hook

  const fetchBrands = async () => {
    try {
      const response = await GetAllBrandsApi()
      setBrands(response)
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    }
  }

  useEffect(() => {
    fetchBrands()
  }, [])

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal)

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Brands</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={handleModal}>
              <Plus size={15} />
              <span className='align-middle ms-50'>Add Brand</span>
            </Button>
          </div>
        </CardHeader>
        <Row className='justify-content-end mx-0'>
          <SearchFilter
            searchValue={searchValue}
            onSearchChange={handleFilter}
            placeholder='Search Brand...'
          />
        </Row>
        <div className='react-dataTable react-dataTable-selectable-rows'>
          <DataTable
            noHeader
            pagination
            columns={Brandscolumns()}
            paginationPerPage={7}
            className='react-dataTable'
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={() => (
              <CustomPagination
                currentPage={currentPage}
                pageCount={
                  searchValue.length
                    ? Math.ceil(filteredData.length / 7)
                    : Math.ceil(brands.length / 7)
                }
                onPageChange={handlePagination}
              />
            )}
            paginationDefaultPage={currentPage + 1}
            data={searchValue.length ? filteredData : brands}
          />
        </div>
      </Card>
      {/* ADD BRAND MODAL */}
      <AddBrandModal open={modal} handleModal={handleModal} onAddSuccess={fetchBrands} />
    </Fragment>
  )
}

export default BrandTable
