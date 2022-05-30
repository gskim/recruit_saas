import { deleteLicense } from 'api'
import { FormInput } from 'components/form'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { useState } from 'react'
import Spinner from 'components/Spinner'
import { AxiosResponse } from 'axios'
import { CommonResponse, PostLicensesErrorCode, PutLicensesErrorCode } from '@recruit/interface'
import useLicenseDeleteModalForm, { LicenseDeleteModalFormData } from './hooks/useLicenseDeleteModalForm'

interface LicenseDeleteModalProps {
    show: boolean
    onHide: () => void
    id: number
    onDelete: (data: AxiosResponse<CommonResponse<boolean, null>, any>) => void
}

const LicenseDeleteModal = ({ id, show, onHide, onDelete }: LicenseDeleteModalProps) => {
    const { handleSubmit, control, register, setValue, errors } = useLicenseDeleteModalForm()
    const [buttonDisable, setButtonDisable] = useState<boolean>(false)
    const deleteLicenseMutation = useMutation(
        (id: number) => {
            return deleteLicense(id)
        },
        {
            onSuccess: (data) => {
                onDelete(data)
            },
        }
    )

    const handleValidSubmit = (value: LicenseDeleteModalFormData) => {
        setButtonDisable(true)
        deleteLicenseMutation.mutate(value.id)
    }

    setValue('id', id)

    return (
        <Modal show={show} onHide={onHide} dialogClassName="modal-dialog-centered">
            <Modal.Header onHide={onHide} closeButton className="modal-colored-header bg-danger">
                <h4 className="modal-title text-light">삭제</h4>
            </Modal.Header>
            <Modal.Body>
                <Form className="ps-3 pe-3" onSubmit={handleSubmit(handleValidSubmit)}>
                    <FormGroup>
                        <FormInput
                            type="hidden"
                            name="id"
                            className="form-control chat-input"
                            register={register}
                            key="id"
                            control={control}
                        />
                    </FormGroup>
                </Form>
                <h5 className="mt-0">해당 자격증을 삭제하시겠습니까?</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={onHide}>
                    닫기
                </Button>{' '}
                <Button variant={'danger'} type="submit" disabled={buttonDisable}>
                    {buttonDisable ? <Spinner className="spinner-border-sm" tag="span" color="white" /> : '삭제'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default LicenseDeleteModal
