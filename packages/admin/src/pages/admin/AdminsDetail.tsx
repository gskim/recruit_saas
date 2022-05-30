import { Row, Col, Card, Form, Button, FormGroup } from 'react-bootstrap'
import { PageTitle, FormInput, ProfileImageUploader, FileType, Spinner } from 'components'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import useAdminsDetailForm, { AdminDetailFormData } from './hooks/useAdminsDetailForm'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { adminRoleOptions, adminStatusOptions } from 'appConstants/options'
import { useQuery, useMutation } from 'react-query'
import { adminDetail, adminProfileImagePresignedUrl, modifiedAdmin } from 'api'
import { Suspense, useEffect, useState } from 'react'
import { AdminModel, AdminProfileImageFileType, PutAdminsDetailRequest } from '@recruit/interface'
import Loading from 'components/Loading'

const AdminsDetail = () => {
    const { id } = useParams()
    const [admin, setAdmin] = useState<AdminModel>()
    const navigate = useNavigate()

    const modifiedAdminMutation = useMutation((formData: AdminDetailFormData) => {
        const data: PutAdminsDetailRequest = {
            nickname: formData.nickname,
            phone: formData.phone,
            profile_image: formData.profile_image,
            status: formData.status.value,
            roles: formData.roles.map((role) => role.value),
        }
        return modifiedAdmin(Number(id!), data)
    })

    const handleValidSubmit = (value: AdminDetailFormData) => {
        modifiedAdminMutation.mutate(value, {
            onSuccess: (data) => {
                if (data.data.data) {
                    alert('수정되었습니다')
                    navigate({ pathname: '/admins' })
                } else {
                    console.error(data.data.error)
                    alert(data.data.error?.message)
                }
            },
        })
    }

    const { handleSubmit, register, control, errors, setValue } = useAdminsDetailForm()

    const { data } = useQuery(`admins/${id}`, () => adminDetail(Number(id)), { suspense: true })

    useEffect(() => {
        if (data?.data.data) {
            setAdmin(data.data.data.item)
        }
    }, [data])

    useEffect(() => {
        if (admin) {
            setValue('nickname', admin.nickname)
            setValue('email', admin.email)
            setValue('phone', admin.phone)
            setValue('status', { value: admin.status, label: admin.status })
            setValue(
                'roles',
                admin.roles.map((role) => {
                    return { value: role, label: role }
                })
            )
        }
    }, [admin])

    if (data?.data.error) {
        alert(data.data.error.code + data.data.error.message)
        return <Navigate to={'/error-500-alt'}></Navigate>
    }

    const profileImageUpload = async (file: FileType) => {
        const type = file.type.split('/')[1]
        const result = await adminProfileImagePresignedUrl(Number(id!), {
            type: type === 'png' ? AdminProfileImageFileType.PNG : AdminProfileImageFileType.JPG,
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
            setValue('profile_image', result.data.data!.key)
        }
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: '관리자 관리', path: '/admins' },
                    { label: id!, path: '/admins' + id, active: true },
                ]}
                title={'관리자 상세'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Suspense fallback={Loading}>
                                <Row>
                                    <Col>
                                        <form onSubmit={handleSubmit(handleValidSubmit)}>
                                            <Row>
                                                <Col xl={6}>
                                                    <FormInput
                                                        name="nickname"
                                                        label="닉네임"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="nickname"
                                                        errors={errors}
                                                        control={control}
                                                    />

                                                    <FormInput
                                                        disabled
                                                        name="email"
                                                        label="이메일"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="email"
                                                        control={control}
                                                    />
                                                    <FormInput
                                                        name="phone"
                                                        label="핸드폰번호"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="phone"
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                    <FormGroup className="mb-3">
                                                        <Form.Label>상태</Form.Label>
                                                        <Controller
                                                            name="status"
                                                            control={control}
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
                                                                    options={adminStatusOptions}
                                                                />
                                                            )}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col xl={6}>
                                                    <Form.Group className="mb-3 mt-3 mt-xl-0">
                                                        <Form.Label>프로필 이미지</Form.Label>
                                                        <p className="text-muted font-14">
                                                            추천 사이즈는 400x400(px) 입니다
                                                        </p>
                                                        <ProfileImageUploader
                                                            currentUrl={data?.data.data?.item.profile_image}
                                                            onFileUpload={profileImageUpload}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3 mt-3 mt-xl-0">
                                                        <Form.Label>권한</Form.Label>
                                                        <Controller
                                                            name="roles"
                                                            control={control}
                                                            render={({ field }) => (
                                                                <Select
                                                                    isMulti={true}
                                                                    options={adminRoleOptions}
                                                                    classNamePrefix="react-select"
                                                                    {...field}
                                                                ></Select>
                                                            )}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col></Col>
                                                <Col>
                                                    <Button type="submit" variant="success">
                                                        저장
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </form>
                                    </Col>
                                </Row>
                            </Suspense>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default AdminsDetail
