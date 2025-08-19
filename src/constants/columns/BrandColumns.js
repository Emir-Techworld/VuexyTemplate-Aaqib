import { getActionsColumn } from './ActionColumn'

export const getBrandColumns = ({ onView, onEdit, onDelete }) => [
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
    getActionsColumn({ onView, onEdit, onDelete })
];
