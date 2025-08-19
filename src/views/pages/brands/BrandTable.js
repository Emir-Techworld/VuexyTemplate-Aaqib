// ** React Imports
import { Fragment, useState, useEffect, useMemo, useCallback } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown, Plus } from 'react-feather'

// ** Third Party Components
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

// ** Table Data & Columns
import { GetAllBrandsApi, GET_BRAND_BY_ID, deleteBrandApi } from '../../../api/brand'
import { getBrandColumns } from '../../../constants/columns/BrandColumns'
import CustomPagination from '../../components/CustomPagination'
import SearchFilter from '../../components/SearchFilter'
import useFilter from '../../../utility/hooks/useSearchFilter'

// ** Reactstrap Imports
import { Row, Card, Button, CardTitle, CardHeader } from 'reactstrap'

import AddBrandModal from '../brands/modals/AddBrandModal'
import ViewBrandModal from '../brands/modals/ViewBrandModal'
import EditBrandModal from '../brands/modals/EditBrandModal'

const BrandTable = () => {
  // ** States

  const [addModal, setAddModal] = useState(false)
  const [viewModal, setViewModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState(null)
  const { searchValue, filteredData, handleFilter } = useFilter(brands, [])  // search filter hook

  const fetchBrands = useCallback(async () => {
    try {
      const response = await GetAllBrandsApi()
      setBrands(response)
    } catch (error) {
      console.error('Failed to fetch brands:', error)
    }
  }, [])

  useEffect(() => {
    fetchBrands()
  }, [fetchBrands])

  // ** Function to handle Modal toggle
  const handleAddModal = useCallback(() => setAddModal(prev => !prev), [])
  const handleViewModal = useCallback(() => setViewModal(prev => !prev), [])
  const handleEditModal = useCallback(() => setEditModal(prev => !prev), [])

  // ** Function to handle Pagination
  const handlePagination = page => {
    setCurrentPage(page.selected)
  }

  // ** Action Handlers
  // ** Function to handle View
  const handleView = useCallback(async (row) => {
    try {
      const brandData = await GET_BRAND_BY_ID(row.brandId)
      setSelectedBrand(brandData)
      handleViewModal()
    } catch (error) {
      console.error('Error fetching brand details:', error)
    }
  }, [handleViewModal])

  // ** Function to handle Edit
  const handleEdit = useCallback(row => {
    setSelectedBrand(row)
    handleEditModal()
  }, [handleEditModal])

  // ** Function to handle Delete
  const handleDelete = useCallback(async (row) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    })

    if (result.isConfirmed) {
      try {
        // Call the API to delete the brand
        await deleteBrandApi(row.brandId)

        MySwal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The brand has been deleted.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        })
        
        // Refresh the brand list after deletion
        fetchBrands()
      } catch (error) {
        console.error('Error deleting brand:', error)
        MySwal.fire('Error', 'There was an issue deleting the brand.', 'error')
      }
    }
  }, [fetchBrands])

  // ** Columns for DataTable
  // Using useMemo to memoize columns to prevent unnecessary re-renders
  const columns = useMemo(
    () => getBrandColumns({ onView: handleView, onEdit: handleEdit, onDelete: handleDelete }),
    [handleView, handleEdit, handleDelete]
  )

  return (
    <Fragment>
      <Card>
        <CardHeader className='flex-md-row flex-column align-md-items-center align-items-start border-bottom'>
          <CardTitle tag='h4'>Brands</CardTitle>
          <div className='d-flex mt-md-0 mt-1'>
            <Button className='ms-2' color='primary' onClick={handleAddModal}>
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
            columns={columns}
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
      {/* Modals for Add, View, and Edit */}
      <AddBrandModal open={addModal} handleModal={handleAddModal} onAddSuccess={fetchBrands} />
      <ViewBrandModal open={viewModal} handleModal={handleViewModal} brand={selectedBrand} />
      <EditBrandModal open={editModal} handleModal={handleEditModal} onEditSuccess={fetchBrands} brand={selectedBrand} />
    </Fragment>
  )
}

export default BrandTable
