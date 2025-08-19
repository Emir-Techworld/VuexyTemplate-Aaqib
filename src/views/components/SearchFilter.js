import { Input, Label, Col } from 'reactstrap'

const SearchFilter = ({ searchValue, onSearchChange, placeholder = 'Search...' }) => {
  return (
    <Col className='d-flex align-items-center justify-content-end mt-1' md='6' sm='12'>
      <Label className='me-1' for='search-input'>
        Search
      </Label>
      <Input
        className='dataTable-filter mb-50'
        type='text'
        bsSize='sm'
        id='search-input'
        value={searchValue}
        placeholder={placeholder}
        onChange={onSearchChange}
      />
    </Col>
  )
}

export default SearchFilter
