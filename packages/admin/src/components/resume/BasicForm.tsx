import { upload } from 'api/file'
import { FileType } from 'components/FileUploader'
import { FormInput, FormSelect } from 'components/form'
import FormAddress from 'components/form/FormAddress'
import { FormFileUploader } from 'components/form/FormFileUploader'
import SkillSearchInput from 'components/form/SkillSearchInput'
import { Col, Form, Row } from 'react-bootstrap'
import { Control, FieldErrors } from 'react-hook-form'
import { FileType as UploadFileType } from '@recruit/interface'

interface BasicFormProps {
    errors?: FieldErrors
    control: Control<any>
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
        path: 'resume_profile_images',
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

const BasicForm = ({ register, errors, control, setValue }: BasicFormProps) => {
    return (
        <>
            <Row className="mb-2">
                <Col xl={6}>
                    <FormInput required label="제목" name="title" register={register} errors={errors} />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xl={6}>
                    <FormInput required label="이름" name="name" register={register} errors={errors} />
                </Col>
                <Col xl={6}>
                    <FormInput
                        required
                        label="휴대폰 번호"
                        name="phone"
                        register={register}
                        errors={errors}
                        placeholder="01011112222"
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xl={6}>
                    <Form.Group>
                        <Form.Label>프로필 사진</Form.Label>
                        <FormFileUploader
                            register={register}
                            name={`profileImage`}
                            errors={errors}
                            control={control}
                            onFileUpload={async (file) => {
                                const key = await fileUpload(file)
                                if (key) {
                                    setValue(`profileImage`, key)
                                }
                            }}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xl={6}>
                    <FormInput required label="이메일" name="email" register={register} errors={errors} />
                </Col>
                <Col xl={6}>
                    <FormInput
                        label="생년월일"
                        name="birthday"
                        register={register}
                        errors={errors}
                        placeholder="YYYY-MM-DD"
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xl={6}>
                    <FormAddress label="주소" name="address" register={register} errors={errors} />
                </Col>
                <Col xl={6}>
                    <FormSelect
                        required
                        isMulti={false}
                        label="성별"
                        name="gender"
                        register={register}
                        control={control}
                        errors={errors}
                        options={[
                            { value: 'M', label: 'M' },
                            { value: 'W', label: 'W' },
                        ]}
                    />
                </Col>
            </Row>
            <Row className="mb-2">
                <Col xl={12}>
                    <Form.Group>
                        <Form.Label>보유 스킬</Form.Label>
                        <SkillSearchInput
                            id="skillList"
                            name="skillList"
                            control={control}
                            register={register}
                            errors={errors}
                        />
                    </Form.Group>
                </Col>
            </Row>
        </>
    )
}

export default BasicForm
