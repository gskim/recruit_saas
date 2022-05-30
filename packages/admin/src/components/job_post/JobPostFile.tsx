import { FileType as UploadFileType, JobPostFileModel } from '@recruit/interface'
import { upload } from 'api/file'
import { FileType } from 'components/FileUploader'
import { FormInput } from 'components/form'
import { FormFileUploader } from 'components/form/FormFileUploader'
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap'
import { Control, FieldErrors, useFieldArray } from 'react-hook-form'

interface JobPostFileProps {
    errors: FieldErrors
    control?: Control<any>
    className?: string
    register?: any
    setValue: any
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

const JobPostFile = ({ errors, control, register, setValue }: JobPostFileProps) => {
    const fileUpload = async (file: FileType) => {
        const type = getFileType(file.type)
        if (!type) {
            alert('불가능한 파일타입입니다')
            return false
        }
        const result = await upload({
            path: 'job_posts',
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

    const { fields, append, remove } = useFieldArray({ name: 'files', control })
    if (fields.length === 0) {
        append({ id: undefined, name: null, key: null })
    }

    return (
        <>
            {fields.map((file, idx) => {
                return (
                    <Row key={'file_' + idx} className="mb-2">
                        <Col xl={3}>
                            <FormInput
                                name={`files.${idx}.id`}
                                type="hidden"
                                register={register}
                                errors={errors}
                                control={control}
                            />
                            <FormInput
                                name={`files.${idx}.name`}
                                label="종류"
                                register={register}
                                errors={errors}
                                control={control}
                            />
                        </Col>
                        <Col xl={5}>
                            <Form.Group>
                                <Form.Label>파일</Form.Label>
                                <FormFileUploader
                                    register={register}
                                    name={`files.${idx}.key`}
                                    errors={errors}
                                    control={control}
                                    onFileUpload={async (file) => {
                                        const key = await fileUpload(file)
                                        if (key) {
                                            setValue(`files.${idx}.key`, key)
                                        }
                                    }}
                                />
                            </Form.Group>
                        </Col>
                        <Col xl={3}>
                            <Form.Group>
                                <Form.Label>액션</Form.Label>
                                <InputGroup>
                                    <Button className="me-2" onClick={() => remove(idx)}>
                                        제거
                                    </Button>
                                    {idx === fields.length - 1 && (
                                        <Button onClick={() => append({ name: null, key: null, id: undefined })}>
                                            추가
                                        </Button>
                                    )}
                                </InputGroup>
                            </Form.Group>
                        </Col>
                    </Row>
                )
            })}
        </>
    )
}
export default JobPostFile
