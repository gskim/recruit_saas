import React from 'react'
import { Modal } from 'react-bootstrap'
import DaumPostcode from 'react-daum-postcode'

interface DaumPostPopUpProps {
    show: boolean
    onHide: () => void
    setAddress: React.Dispatch<React.SetStateAction<string | null>>
}

const DaumPostModal = (props: DaumPostPopUpProps) => {
    const setAddress = props.setAddress

    const onCompletePost = (data: any) => {
        // data.address 도로명주소
        // data.jibunAddress 지번주소
        setAddress(data.address)
        props.onHide()
    }

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} dialogClassName="modal-dialog-centered">
                <Modal.Body>
                    <DaumPostcode autoClose onComplete={onCompletePost} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DaumPostModal
