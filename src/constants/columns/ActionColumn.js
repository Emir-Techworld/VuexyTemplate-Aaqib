import {
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap'

import { MoreVertical, FileText, Archive, Trash } from 'react-feather'

/**
 * Returns a reusable "Actions" column definition for react-data-table-component.
 * @param {object} params - The parameters object.
 * @param {function(row): void} [params.onView] - Handler for the view action. If not provided, the "View" item will not be rendered.
 * @param {function(row): void} [params.onEdit] - Handler for the edit action. If not provided, the "Edit" item will not be rendered.
 * @param {function(row): void} [params.onDelete] - Handler for the delete action. If not provided, the "Delete" item will not be rendered.
 * @returns {object} The column definition object.
 */
export const getActionsColumn = ({ onView, onEdit, onDelete }) => ({
    name: 'Actions',
    allowOverflow: true,
    cell: (row) => {
        // Conditionally render items only if handlers are provided
        const hasActions = onView || onEdit || onDelete;

        if (!hasActions) {
            return null;
        }

        return (
            <div className='d-flex'>
                <UncontrolledDropdown>
                    <DropdownToggle className='pe-1' tag='span'>
                        <MoreVertical size={15} />
                    </DropdownToggle>
                    <DropdownMenu end>
                        {onView && (
                            <DropdownItem
                                tag='a'
                                href='/'
                                className='w-100'
                                onClick={e => {
                                    e.preventDefault()
                                    onView(row)
                                }}
                            >
                                <FileText size={15} />
                                <span className='align-middle ms-50'>View</span>
                            </DropdownItem>
                        )}
                        {onEdit && (
                            <DropdownItem
                                tag='a'
                                href='/'
                                className='w-100'
                                onClick={e => {
                                    e.preventDefault()
                                    onEdit(row)
                                }}
                            >
                                <Archive size={15} />
                                <span className='align-middle ms-50'>Edit</span>
                            </DropdownItem>
                        )}
                        {onDelete && (
                            <DropdownItem
                                tag='a'
                                href='/'
                                className='w-100'
                                onClick={e => {
                                    e.preventDefault()
                                    onDelete(row)
                                }}
                            >
                                <Trash size={15} />
                                <span className='align-middle ms-50'>Delete</span>
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        )
    }
});
