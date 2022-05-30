import { deleteSchool } from 'api'
import { FormInput } from 'components/form'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { useState } from 'react'
import Spinner from 'components/Spinner'
import { AxiosResponse } from 'axios'
import { CommonResponse } from '@recruit/interface'
import useSchoolDeleteModalForm, { SchoolDeleteModalFormData } from './hooks/useSchoolDeleteModalForm'

interface SchoolDeleteModalProps {
    show: boolean
    onHide: () => void
    id: number
    onDelete: (data: AxiosResponse<CommonResponse<boolean, null>, any>) => void
}

const SchoolDeleteModal = ({ id, show, onHide, onDelete }: SchoolDeleteModalProps) => {
    const { handleSubmit, control, register, setValue, errors } = useSchoolDeleteModalForm()
    const [buttonDisable, setButtonDisable] = useState<boolean>(false)
    const deleteSchoolMutation = useMutation(
        (id: number) => {
            return deleteSchool(id)
        },
        {
            onSuccess: (data) => {
                onDelete(data)
            },
        }
    )

    const handleValidSubmit = (value: SchoolDeleteModalFormData) => {
        setButtonDisable(true)
        deleteSchoolMutation.mutate(value.id)
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

export default SchoolDeleteModal
