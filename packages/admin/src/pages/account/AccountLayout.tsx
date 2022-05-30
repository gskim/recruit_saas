import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import Logo from 'assets/images/logo.png'
import Logo from 'assets/images/logo/02_b_gray.png'
import { useAccountLayout } from './hooks'

type AccountLayoutProps = {
    bottomLinks?: React.ReactNode
    children?: React.ReactNode
}

const AccountLayout = ({ bottomLinks, children }: AccountLayoutProps) => {
    useAccountLayout()

    return (
        <>
            <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8} lg={6} xl={5} xxl={4}>
                            <Card>
                                {/* logo */}
                                <Card.Header className="pt-4 pb-4 text-center bg-primary">
                                    <Link to="/">
                                        <span>
                                            <img src={Logo} alt="" height="48" />
                                        </span>
                                    </Link>
                                </Card.Header>
                                <Card.Body className="p-4">{children}</Card.Body>
                            </Card>

                            {/* bottom links */}
                            {bottomLinks}
                        </Col>
                    </Row>
                </Container>
            </div>
            <footer className="footer footer-alt">
                {`2021 - ${new Date().getFullYear()}  - recruit.careers`}
            </footer>
        </>
    )
}

export default AccountLayout
