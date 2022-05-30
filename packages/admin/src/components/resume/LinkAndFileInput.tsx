import { FileType } from 'components/FileUploader'
import { FormInput } from 'components/form'
import { FormFileUploader } from 'components/form/FormFileUploader'
import { Col, Form, Row } from 'react-bootstrap'
import { Control, FieldErrors, UseFormSetValue } from 'react-hook-form'
import Select from 'react-select'
import { FileType as UploadFileType } from '@recruit/interface'
import { upload } from 'api/file'
import { useState } from 'react'

interface LinkAndFileInputProps {
    idx: number
    register?: any
    control?: Control<any>
    errors?: FieldErrors
    setValue: UseFormSetValue<any>
    link: any
}

const getFileType = (type: string) => {
    const _type = type.split('/')[1]
    switch (_type) {
        case 'png':
            return UploadFileType.PNG
        case 'jpg':
        case 'jpeg':
            return UploadFileType.JPG
        case 'hwp':
            return UploadFileType.HWP
        case 'pdf':
            return UploadFileType.PDF
        default:
            return false
    }
}

const fileUpload = async (file: FileType) => {
    const type = getFileType(file.type)
    if (!type) {
        alert('불가능한 파일타입입니다')
        return false
    }
    const result = await upload({
        path: 'resume_links',
        type,
    })
    const response = await fetch(
        new Request(result.data.data!.url, {
            method: 'PUT',
            body: file,
            headers: new Headers({
                'Content-Type': file.type,
            }),
        })
    )
    if (response.status !== 200) {
        alert('업로드 경로를 받아올 수 없습니다')
    } else {
        return result.data.data!.key
    }
}

const LinkAndFileInput = ({ idx, register, control, errors, setValue, link }: LinkAndFileInputProps) => {
    const [linkAndFile, setLinkAndfFile] = useState<string>(link.key ? '파일' : '링크')
    return (
        <Row>
            <Col xl={6}>
                <Form.Group>
                    <Form.Label>방식<span style={{ color: 'red' }}> *</span></Form.Label>
                    <Select
                        classNamePrefix="react-select"
                        value={{ value: linkAndFile, label: linkAndFile }}
                        defaultValue={{ value: linkAndFile, label: linkAndFile }}
                        onChange={(v) => {
                            if (v) {
                                setLinkAndfFile(v.value)
                            }
                        }}
                        options={[
                            { value: '링크', label: '링크' },
                            { value: '파일', label: '파일' },
                        ]}
                    />
                </Form.Group>
            </Col>
            {linkAndFile === '링크' ? (
                <Col xl={6}>
                    <Form.Group>
                        <Form.Label>링크<span style={{ color: 'red' }}> *</span></Form.Label>
                        <FormInput name={`links.${idx}.url`} control={control} register={register} />
                    </Form.Group>
                </Col>
            ) : (
                <Col xl={6}>
                    <Form.Group>
                        <Form.Label>파일<span style={{ color: 'red' }}> *</span></Form.Label>
                        <FormInput
                            type="hidden"
                            name={`links.${idx}.original_name`}
                            control={control}
                            register={register}
                        />
                        <FormFileUploader
                            register={register}
                            name={`links[${idx}].key`}
                            errors={errors}
                            control={control}
                            onFileUpload={async (file) => {
                                const key = await fileUpload(file)
                                if (key) {
                                    setValue(`links.${idx}.original_name`, file.name)
                                    setValue(`links.${idx}.key`, key)
                                }
                            }}
                        />
                    </Form.Group>
                </Col>
            )}
        </Row>
    )
}

export default LinkAndFileInput
