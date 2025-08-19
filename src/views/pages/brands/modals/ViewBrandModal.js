// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const ViewBrandModal = ({ open, handleModal, brand }) => {
    // If there's no brand data, don't render the modal
    if (!brand) return null

    return (
        <Modal isOpen={open} toggle={handleModal} className='modal-dialog-centered'>
            <ModalHeader toggle={handleModal}>Brand Details</ModalHeader>
            <ModalBody>
                <div className='mb-2'>
                    <strong>Brand Name:</strong>
                    <p className='text-muted mt-1'>{brand.brandName}</p>
                </div>
                <div>
                    <strong>Description:</strong>
                    <p className='text-muted mt-1'>{brand.description}</p>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color='secondary' onClick={handleModal}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ViewBrandModal

