import { Link } from 'react-router-dom'
import AccountLayout from './AccountLayout'
import mailSent from 'assets/images/mail_sent.svg'

const Confirm = () => {
    return (
        <AccountLayout>
            <div className="text-center m-auto">
                <img src={mailSent} alt="mail sent" height="64" />
                <h4 className="text-dark-50 text-center mt-4 fw-bold">{'등록이 완료되었습니다'}</h4>
                <p className="text-muted mb-4">{'관리자 승인 처리 후 로그인이 가능합니다.'}</p>
                <p className="text-center">
                    <Link className="btn btn-primary" to="/account/login">
                        {'로그인 화면으로 돌아가기'}
                    </Link>
                </p>
            </div>
        </AccountLayout>
    )
}

export default Confirm
