import { createLicense, updateLicense } from 'api'
import { FormInput } from 'components/form'
import { Button, Form, FormGroup, Modal } from 'react-bootstrap'
import { useMutation } from 'react-query'
import useLicenseModalForm, { LicenseModalFormData } from './hooks/useLicenseModalForm'
import { useEffect, useState } from 'react'
import Spinner from 'components/Spinner'
import { AxiosResponse } from 'axios'
import { CommonResponse, PostLicensesErrorCode, PutLicensesErrorCode } from '@recruit/interface'

interface LicenseModalProps {
    show: boolean
    onHide: () => void
    id?: number
    name?: string
    type?: string
    organization?: string
    onCreate: (data: AxiosResponse<CommonResponse<boolean, PostLicensesErrorCode>, any>) => void
    onUpdate: (data: AxiosResponse<CommonResponse<boolean, PutLicensesErrorCode>, any>) => void
}

const LicenseModal = ({ id, name, organization, type, show, onHide, onCreate, onUpdate }: LicenseModalProps) => {
    const { handleSubmit, control, register, setValue, errors, clearErrors } = useLicenseModalForm()
    const [buttonDisable, setButtonDisable] = useState<boolean>(false)

    useEffect(() => {
        clearErrors()
        setValue('name', name)
        setValue('type', type)
        setValue('organization', organization)
        setValue('id', id)
    }, [show])

    const createLicenseMutation = useMutation(
        (data: { name: string; type: string; organization: string }) => {
            return createLicense(data)
        },
        {
            onSuccess: (data) => {
                setButtonDisable(false)
                onCreate(data)
            },
        }
    )

    const updateLicenseMutation = useMutation(
        (data: { name: string; type: string; organization: string }) => {
            return updateLicense(Number(id!), data)
        },
        {
            onSuccess: (data) => {
                setButtonDisable(false)
                onUpdate(data)
            },
        }
    )

    const handleValidSubmit = (value: LicenseModalFormData) => {
        setButtonDisable(true)
        if (id) {
            updateLicenseMutation.mutate({ name: value.name!, type: value.type!, organization: value.organization! })
        } else {
            createLicenseMutation.mutate({ name: value.name!, type: value.type!, organization: value.organization! })
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
                            <Form.Label>자격증명</Form.Label>
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
                            <Form.Label>구분</Form.Label>
                            <FormInput
                                type="text"
                                name="type"
                                className="form-control chat-input"
                                register={register}
                                key="type"
                                errors={errors}
                                control={control}
                            />
                        </FormGroup>
                    </div>

                    <div className="mb-3">
                        <FormGroup>
                            <Form.Label>조직</Form.Label>
                            <FormInput
                                type="text"
                                name="organization"
                                className="form-control chat-input"
                                register={register}
                                key="organization"
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

export default LicenseModal
