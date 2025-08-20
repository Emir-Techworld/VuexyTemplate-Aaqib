// ** React Imports
import { useEffect } from 'react'

// ** Reactstrap Imports
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'

// ** api
import { updateBrandApi } from '../../../../api/brand'
import { createBrandPayload } from '../../../../api/payloads/brandPayLoads'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Form } from 'reactstrap'

const EditBrandModal = ({ open, handleModal, onEditSuccess, brand }) => {
    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            brandName: '',
            description: ''
        }
    })

    // Populate form with brand data when the modal opens
    useEffect(() => {
        if (brand) {
            reset({
                brandName: brand.brandName,
                description: brand.description
            })
        }
    }, [brand, reset])


    const onSubmit = async (data) => {
        try {
            // Assuming the update payload needs the brandId
            const payload = { ...createBrandPayload(data.brandName, data.description), brandId: brand.brandId }
            await updateBrandApi(payload) // You will need to implement this API call
            toast.success('Brand updated successfully!')
            if (onEditSuccess) {
                onEditSuccess()
            }
            handleModal()
        } catch (error) {
            toast.error('Failed to update brand. Please try again.')
        }
    }

    if (!brand) return null

    return (
        <Modal isOpen={open} toggle={handleModal} className='modal-dialog-centered'>
            <ModalHeader toggle={handleModal}>Edit Brand</ModalHeader>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <div className='mb-1'>
                        <Label className='form-label' for='brandName'>
                            Brand Name
                        </Label>
                        <Controller
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
                            control={control}
                            id='description'
                            name='description'
                            rules={{ required: true }}
                            render={({ field }) => <Input placeholder='Description' invalid={errors.description && true} {...field} />}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color='primary' type='submit'>
                        Update
                    </Button>
                    <Button color='secondary' onClick={handleModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}
export default EditBrandModal