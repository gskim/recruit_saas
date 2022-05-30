import { Row, Col, Card, Form, Button } from 'react-bootstrap'
import { PageTitle, FormInput, ProfileImageUploader, FileType } from 'components'
import { Navigate, useParams } from 'react-router-dom'
import useCompanyDetailForm, { CompanyDetailFormData } from './hooks/useCompanyDetailForm'
import { useQuery, useMutation } from 'react-query'
import { Suspense, useEffect, useState } from 'react'
import {
    CompanyLogoImageFileType,
    CompanyModel,
    PostCompaniesRequest,
    PutCompaniesDetailRequest,
} from '@recruit/interface'
import { companyDetail, updateCompany, createCompany, companyLogoImagePresignedUrl } from 'api/company'
import { useNavigate } from 'react-router-dom'
import FormAddress from 'components/form/FormAddress'
import Loading from 'components/Loading'

const CompanyDetail = () => {
    const { id } = useParams()
    const [company, setCompany] = useState<CompanyModel>()
    const navigate = useNavigate()

    const updateCompanyMutation = useMutation(
        (formData: CompanyDetailFormData) => {
            const data: PutCompaniesDetailRequest = {
                ...formData,
            }
            return updateCompany(Number(id!), data)
        },
        {
            onSuccess: (data) => {
                if (data.data.data) {
                    alert('수정되었습니다')
                    navigate({ pathname: '/companies' })
                }
            },
        }
    )

    const createCompanyMutation = useMutation(
        (formData: CompanyDetailFormData) => {
            const data: PostCompaniesRequest = {
                ...formData,
            }
            return createCompany(data)
        },
        {
            onSuccess: (data) => {
                if (data.data.data) {
                    alert('등록되었습니다')
                    navigate({ pathname: '/companies' })
                }
            },
        }
    )

    const handleValidSubmit = (value: CompanyDetailFormData) => {
        if (id === 'new') {
            createCompanyMutation.mutate(value)
        } else {
            updateCompanyMutation.mutate(value)
        }
    }

    const { handleSubmit, register, control, errors, setValue } = useCompanyDetailForm()

    const { data } = useQuery(`companies/${id}`, () => companyDetail(Number(id)), {
        enabled: id !== 'new',
        suspense: true,
    })

    useEffect(() => {
        if (data?.data.data) {
            setCompany(data.data.data.item)
        }
    }, [data])

    useEffect(() => {
        if (company) {
            setValue('name_ko', company.name_ko)
            setValue('name_en', company.name_en)
            setValue('email', company.email)
            setValue('tel', company.tel)
            setValue('address', company.address)
        }
    }, [company])

    const logoImageUpload = async (file: FileType) => {
        const fileType = file.type.split('/')[1]
        const result = await companyLogoImagePresignedUrl({
            type: fileType === 'png' ? CompanyLogoImageFileType.PNG : CompanyLogoImageFileType.JPG,
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
            setValue('logo_img_url', result.data.data!.key)
        }
    }

    if (data && data.data.error) {
        alert(data.data.error.code + data.data.error.message)
        return <Navigate to={'/error-500-alt'}></Navigate>
    }

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: '기업 관리', path: '/companies' },
                    { label: id!, path: '/companies' + id, active: true },
                ]}
                title={'기업 상세'}
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
                                                        name="name_ko"
                                                        label="회사명(한글)"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="name_ko"
                                                        errors={errors}
                                                        control={control}
                                                    />

                                                    <FormInput
                                                        name="email"
                                                        label="이메일"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="email"
                                                        control={control}
                                                    />
                                                    <FormInput
                                                        name="tel"
                                                        label="전화번호"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="tel"
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                </Col>
                                                <Col xl={6}>
                                                    <FormInput
                                                        name="name_en"
                                                        label="회사명(영문)"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        key="name_en"
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                    <FormAddress
                                                        name="address"
                                                        label="주소"
                                                        containerClass={'mb-3'}
                                                        register={register}
                                                        errors={errors}
                                                        control={control}
                                                    />
                                                    <Form.Group className="mb-3 mt-3 mt-xl-0">
                                                        <Form.Label>프로필 이미지</Form.Label>
                                                        <p className="text-muted font-14">
                                                            추천 사이즈는 400x400(px) 입니다
                                                        </p>
                                                        <ProfileImageUploader
                                                            currentUrl={data?.data.data?.item.logo_img_url}
                                                            onFileUpload={logoImageUpload}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Row className="mt-2">
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

export default CompanyDetail
