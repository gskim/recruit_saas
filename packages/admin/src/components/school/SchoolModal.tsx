import { createSchool, updateSchool } from 'api'
import { FormInput } from 'components/form'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import { useMutation } from 'react-query'
import useSchoolModalForm, { SchoolModalFormData } from './hooks/useSchoolModalForm'
import { useEffect, useState } from 'react'
import Spinner from 'components/Spinner'
import { AxiosResponse } from 'axios'
import { CommonResponse, PostSchoolsErrorCode, PutSchoolsErrorCode } from '@recruit/interface'

interface SchoolModalProps {
    show: boolean
    onHide: () => void
    id?: number
    name?: string
    category1?: string
    category2?: string
    onCreate: (data: AxiosResponse<CommonResponse<boolean, PostSchoolsErrorCode>, any>) => void
    onUpdate: (data: AxiosResponse<CommonResponse<boolean, PutSchoolsErrorCode>, any>) => void
}

const SchoolModal = ({ id, name, category1, category2, show, onHide, onCreate, onUpdate }: SchoolModalProps) => {
    const { handleSubmit, control, register, setValue, errors, clearErrors } = useSchoolModalForm()
    const [buttonDisable, setButtonDisable] = useState<boolean>(false)
    const createSchoolMutation = useMutation(
        (data: { name: string; category1: string; category2: string }) => {
            return createSchool(data)
        },
        {
            onSuccess: (data) => {
                setButtonDisable(false)
                onCreate(data)
            },
        }
    )

    useEffect(() => {
        clearErrors()
        setValue('name', name)
        setValue('category1', category1)
        setValue('category2', category2)
        setValue('id', id)
    }, [show])

    const updateSchoolMutation = useMutation(
        (data: { name: string; category1: string; category2: string }) => {
            return updateSchool(Number(id!), data)
        },
        {
            onSuccess: (data) => {
                setButtonDisable(false)
                onUpdate(data)
            },
        }
    )

    const handleValidSubmit = (value: SchoolModalFormData) => {
        setButtonDisable(true)
        if (id) {
            updateSchoolMutation.mutate({ name: value.name!, category1: value.category1!, category2: value.category2! })
        } else {
            createSchoolMutation.mutate({ name: value.name!, category1: value.category1!, category2: value.category2! })
        }
    }

    return (
        <Modal show={show} onHide={onHide} dialogClassName="modal-dialog-centered">
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
                    <div className="mb-3">
                        <FormGroup>
                            <Form.Label>대학명</Form.Label>
                            <FormInput
                                type="text"
                                name="name"
                                className="form-control chat-input"
                                register={register}
                                key="name"
                                errors={errors}
                                control={control}
                            />
                        </FormGroup>
                    </div>
                    <div className="mb-3">
                        <FormGroup>
                            <Form.Label>구분1</Form.Label>
                            <FormInput
                                type="text"
                                name="category1"
                                className="form-control chat-input"
                                register={register}
                                key="category1"
                                errors={errors}
                                control={control}
                            />
                        </FormGroup>
                    </div>

                    <div className="mb-3">
                        <FormGroup>
                            <Form.Label>구분2</Form.Label>
                            <FormInput
                                type="text"
                                name="category2"
                                className="form-control chat-input"
                                register={register}
                                key="category2"
                                errors={errors}
                                control={control}
                            />
                        </FormGroup>
                    </div>

                    <div className="mb-3 text-center">
                        <Button color="primary" type="submit" disabled={buttonDisable}>
                            {buttonDisable ? (
                                <Spinner className="spinner-border-sm" tag="span" color="white" />
                            ) : id ? (
                                '수정'
                            ) : (
                                '등록'
                            )}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SchoolModal
