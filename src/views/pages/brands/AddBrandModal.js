// ** Reactstrap Imports
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'

// ** api
import { addBrandApi } from '../../../api/brand'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Form } from 'reactstrap'

const AddBrandModal = ({ open, handleModal, onAddSuccess }) => {

    const {
        reset,
        control,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const onSubmit = async (data) => {
        try {
            await addBrandApi(data)
            toast.success('Brand added successfully!')
            if (onAddSuccess) {
                onAddSuccess()
            }
            handleModal()
            reset()
        } catch (error) {
            toast.error('Failed to add brand. Please try again.')
        }
    }

    const handleReset = () => {
        reset({
            brandName: '',
            description: '',
        })
    }


    // ** States
    return (
        <div className='demo-inline-spacing'>
            <div>
                <Modal isOpen={open} toggle={handleModal} className='modal-dialog-centered'>
                    <ModalHeader toggle={handleModal}>Add Brand</ModalHeader>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <ModalBody>
                            <div className='mb-1'>
                                <Label className='form-label' for='brandName'>
                                    Brand Name
                                </Label>
                                <Controller
                                    defaultValue=''
                                    control={control}
                                    id='brandName'
                                    name='brandName'
                                    rules={{ required: true }}
                                    render={({ field }) => <Input placeholder='Brand Name' invalid={errors.brandName && true} {...field} />}
                                />
                            </div>
                            <div className='mb-1'>
                                <Label className='form-label' for='description'>
                                    Description
                                </Label>
                                <Controller
                                    defaultValue=''
                                    control={control}
                                    id='description'
                                    name='description'
                                    rules={{ required: true }}
                                    render={({ field }) => <Input placeholder='Description' invalid={errors.description && true} {...field} />}
                                />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className='d-flex'>
                                <Button className='me-1' color='primary' type='submit'>
                                    Submit
                                </Button>
                                <Button outline color='secondary' type='reset' onClick={handleReset}>
                                    Reset
                                </Button>
                            </div>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}
export default AddBrandModal
