// ** Third Party Imports
import ReactPaginate from 'react-paginate'

// ** Styles
// import '@styles/react/libs/pagination/react-paginate.scss'

const CustomPagination = ({ currentPage, pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel=''
      nextLabel=''
      forcePage={currentPage}
      onPageChange={onPageChange}
      pageCount={pageCount || 1}
      breakLabel='...'
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName='active'
      pageClassName='page-item'
      breakClassName='page-item'
      nextLinkClassName='page-link'
      pageLinkClassName='page-link'
      breakLinkClassName='page-link'
      previousLinkClassName='page-link'
      nextClassName='page-item next-item'
      previousClassName='page-item prev-item'
      containerClassName='pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
    />
  )
}

export default CustomPagination
