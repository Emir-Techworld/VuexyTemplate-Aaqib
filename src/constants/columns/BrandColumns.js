
import {
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap'

import { MoreVertical, FileText, Archive, Trash } from 'react-feather'

// const Brandscolumns = ({ onView, onEdit, onDelete }) => [
const Brandscolumns = () => [
    {
        name: "Brand Name",
        sortable: true,
        minWidth: "150px",
        selector: (row) => row.brandName,
    },

    {
        name: "Description",
        sortable: true,
        minWidth: "150px",
        selector: (row) => row.description,
    },
    {
        name: "Created At",
        sortable: true,
        minWidth: "250px",
        selector: (row) => row.createdAt,
    },
    {
        name: "Created By",
        sortable: true,
        minWidth: "250px",
        selector: (row) => row.createdBy,
    },
    {
        name: 'Actions',
        allowOverflow: true,
        cell: () => {
            return (
                <div className='d-flex'>
                    <UncontrolledDropdown>
                        <DropdownToggle className='pe-1' tag='span'>
                            <MoreVertical size={15} />
                        </DropdownToggle>
                        <DropdownMenu end>
                            <DropdownItem tag='a' href='/' className='w-100'
                                onClick={e => {
                                    e.preventDefault()
                                    // onView(row)
                                }}
                            >
                                <FileText size={15} />
                                <span className='align-middle ms-50'>View</span>
                            </DropdownItem>
                            <DropdownItem tag='a' href='/' className='w-100'
                                onClick={e => {
                                    e.preventDefault()
                                    // onEdit(row)
                                }}
                            >
                                <Archive size={15} />
                                <span className='align-middle ms-50'>Edit</span>
                            </DropdownItem>
                            <DropdownItem tag='a' href='/' className='w-100' onClick={e => {
                                e.preventDefault()
                                // onDelete(row)
                            }}
                            >
                                <Trash size={15} />
                                <span className='align-middle ms-50'>Delete</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div >
            )
        }
    }
];

export default Brandscolumns
