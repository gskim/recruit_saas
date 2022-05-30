import { Navigate, Link } from 'react-router-dom'
import { Button, Alert, Row, Col } from 'react-bootstrap'
import { VerticalForm, FormInput } from 'components'
import AccountLayout from './AccountLayout'
import { useRegister } from './hooks'

export type UserData = {
    email: string
    password: string
}

const BottomLink = () => {
    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {'이미 계정이 있으신가요?'}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1">
                        <b>{'로그인'}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    )
}

const Register = () => {
    const { isLoading, data, isError, error, schemaResolver, onSubmit } = useRegister()
    return (
        <>
            {data ? <Navigate to={'/account/confirm'}></Navigate> : null}

            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{'계정 등록'}</h4>
                    <p className="text-muted mb-4">{'계정 등록 후 관리자에게 승인요청해주세요'}</p>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error.message}
                    </Alert>
                )}

                <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                    <FormInput
                        label={'이메일'}
                        type="email"
                        name="email"
                        placeholder={'Enter your email'}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={'비밀번호'}
                        type="password"
                        name="password"
                        placeholder={'Enter your password'}
                        containerClass={'mb-3'}
                    />
                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {'등록'}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    )
}

export default Register
