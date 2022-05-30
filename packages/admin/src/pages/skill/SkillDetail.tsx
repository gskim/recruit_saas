import { Row, Col, Card, Form, Button, FormGroup } from 'react-bootstrap'
import { PageTitle, FormInput, FileType, Spinner } from 'components'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useSkillsDetailForm, { SkillDetailFormData } from './hooks/useSkillDetailForm'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { skillCategoryOptions } from 'appConstants/options'
import { useQuery, useMutation } from 'react-query'
import { skillDetail, createSkill, modifiedSkill, skillImagePresignedUrl, deleteSkill } from 'api'
import { useEffect, useState } from 'react'
import { SkillModel, PostSkillsRequest, PutSkillsDetailRequest, SkillImageFileType } from '@recruit/interface'
import { SkillImageUploader } from 'components/skill/SkillImageUploader'
import { S3_URL } from 'appConstants/strings'

const SkillsDetail = () => {
    const { id } = useParams()
    const [skill, setSkill] = useState<SkillModel>()
    const navigate = useNavigate()

    const modifiedSkillMutation = useMutation((formData: SkillDetailFormData) => {
        const data: PutSkillsDetailRequest = {
            ...formData,
            alias: formData.alias.split(',').map((v) => v.trim()),
            skill_category_id: formData.skill_category.value,
        }
        return modifiedSkill(Number(id!), data)
    })

    const createSkillMutation = useMutation((formData: SkillDetailFormData) => {
        const data: PostSkillsRequest = {
            ...formData,
            alias: formData.alias.split(',').map((v) => v.trim()),
            skill_category_id: formData.skill_category.value,
        }
        return createSkill(data)
    })

    const deleteBtnClick = async () => {
        if (id) {
            const { data } = await deleteSkill(Number(id))
            if (data.data) {
                return <Navigate to={'/skills'} />
            } else {
                alert('실패하였습니다')
            }
        }
    }

    const handleValidSubmit = (value: SkillDetailFormData) => {
        if (id !== 'new') {
            modifiedSkillMutation.mutate(value, {
                onSuccess: (data) => {
                    if (data.data.data) {
                        alert('수정되었습니다')
                        navigate({ pathname: '/skills' })
                    } else {
                        console.error(data.data.error)
                        alert(data.data.error?.message)
                    }
                },
            })
        } else {
            createSkillMutation.mutate(value, {
                onSuccess: (data) => {
                    if (data.data.data) {
                        alert('등록되었습니다')
                        navigate({ pathname: '/skills' })
                    } else {
                        console.error(data.data.error)
                        alert(data.data.error?.message)
                    }
                },
            })
        }
    }

    const { handleSubmit, register, control, errors, setValue } = useSkillsDetailForm()
    const { isLoading, data, error } = useQuery(`skills/${id}`, () => skillDetail(Number(id)), {
        enabled: id !== 'new',
    })

    useEffect(() => {
        if (data?.data.data) {
            setSkill(data.data.data.item)
        }
    }, [data])

    useEffect(() => {
        if (skill) {
            setValue('name', skill.name)
            setValue('image_key', skill.image_key)
            setValue('website_url', skill.website_url)
            setValue('description', skill.description)
            setValue('alias', skill.alias.join(','))
            setValue('skill_category', { label: skill.skill_category.name, value: skill.skill_category.id })
        }
    }, [skill])

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner className="text-primary m-2" color="primary" size={'lg'} />
            </div>
        )
    }
    // if (error || !data) {
    //     console.error(error)
    //     return <Navigate to={'/error-500-alt'}></Navigate>
    // }

    if (data && data.data.error) {
        alert(data.data.error.code + data.data.error.message)
        return <Navigate to={'/error-500-alt'}></Navigate>
    }

    const imageUpload = async (file: FileType) => {
        const type = file.type.split('/')[1]
        const result = await skillImagePresignedUrl({
            type: type === 'png' ? SkillImageFileType.PNG : SkillImageFileType.JPG,
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
            setValue('image_key', result.data.data!.key)
        }
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: '기술스택 관리', path: '/skills' },
                    { label: id!, path: `/skills${id ? '/' + id : ''}`, active: true },
                ]}
                title={'기술스택 ' + id ? '수정' : '등록'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <form onSubmit={handleSubmit(handleValidSubmit)}>
                                        <Row>
                                            <Col xl={6}>
                                                <FormInput
                                                    name="name"
                                                    label="기술명"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    key="name"
                                                    errors={errors}
                                                    control={control}
                                                />
                                                <FormInput
                                                    name="website_url"
                                                    label="홈페이지주소"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    key="website_url"
                                                    control={control}
                                                />
                                                <FormGroup className="mb-3">
                                                    <Form.Label>카테고리</Form.Label>
                                                    <Controller
                                                        name="skill_category"
                                                        control={control}
                                                        defaultValue={skillCategoryOptions[0]}
                                                        render={({ field }) => (
                                                            <Select
                                                                styles={{
                                                                    control: (styles) => ({
                                                                        ...styles,
                                                                        width: '200px',
                                                                    }),
                                                                }}
                                                                className="react-select"
                                                                classNamePrefix="react-select"
                                                                {...field}
                                                                options={skillCategoryOptions}
                                                            />
                                                        )}
                                                    />
                                                </FormGroup>
                                                <FormInput
                                                    type="textarea"
                                                    name="description"
                                                    label="구분명"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    key="description"
                                                    control={control}
                                                />
                                            </Col>
                                            <Col xl={6}>
                                                <Form.Group className="mb-3 mt-3 mt-xl-0">
                                                    <Form.Label>로고 이미지</Form.Label>
                                                    <p className="text-muted font-14">
                                                        추천 사이즈는 200x200(px) 입니다
                                                    </p>
                                                    <SkillImageUploader
                                                        currentUrl={skill?.image_key ? S3_URL + skill?.image_key : null}
                                                        onFileUpload={imageUpload}
                                                    />
                                                </Form.Group>
                                                <FormInput
                                                    name="alias"
                                                    label="검색단어목록"
                                                    containerClass={'mb-3'}
                                                    register={register}
                                                    key="alias"
                                                    control={control}
                                                />
                                            </Col>
                                        </Row>

                                        <Row className="mt-2">
                                            <Col></Col>
                                            <Col>
                                                <Button className="me-2" type="submit" variant="success">
                                                    저장
                                                </Button>
                                                <Button variant="danger" onClick={() => deleteBtnClick()}>
                                                    삭제
                                                </Button>
                                            </Col>
                                        </Row>
                                    </form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default SkillsDetail
