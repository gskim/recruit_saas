import { Button, Alert, Row, Col } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { VerticalForm, FormInput } from 'components'
import AccountLayout from './AccountLayout'
import { useLogin } from './hooks'

export type UserData = {
    email: string
    password: string
}

const BottomLink = () => {
    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {'계정이 없으신가요?'}{' '}
                    <Link to={'/account/register'} className="text-muted ms-1">
                        <b>{'계정 등록'}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    )
}

const Login = () => {
    const { loading, userLoggedIn, user, error, schemaResolver, onSubmit, redirectUrl } = useLogin()
    return (
        <>
            {(userLoggedIn || user) && <Navigate to={redirectUrl} replace />}

            <AccountLayout bottomLinks={<BottomLink />}>
                {error && (
                    <Alert variant="danger" className="my-2">
                        {error.message}
                    </Alert>
                )}

                <VerticalForm<UserData>
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ email: undefined, password: undefined }}
                >
                    <FormInput
                        label={'이메일'}
                        type="text"
                        name="email"
                        placeholder={'Enter your Email'}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={'비밀번호'}
                        type="password"
                        name="password"
                        placeholder={'Enter your password'}
                        containerClass={'mb-3'}
                    >
                        {/* <Link to="/account/forget-password" className="text-muted float-end">
                            <small>{'Forgot your password?'}</small>
                        </Link> */}
                    </FormInput>

                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {'로그인'}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    )
}

export default Login
