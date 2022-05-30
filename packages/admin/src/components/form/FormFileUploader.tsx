import useProfileImageUploader from '../FileUploader/useProfileImageUploader'
import { FileType } from '../FileUploader/type'
import { Control, FieldErrors } from 'react-hook-form'
import { useRef } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

type FileUploaderProps = {
    onFileUpload?: (file: FileType) => void
    currentUrl?: string | null
    register?: any
    errors?: FieldErrors
    control?: Control<any>
    name: string
}

const FormFileUploader = ({ name, currentUrl, onFileUpload, errors, register, control }: FileUploaderProps) => {
    const { selectedFile, handleAcceptedFile, removeFile } = useProfileImageUploader(false)
    let fileInputRef = useRef<HTMLInputElement>(null)
    if (selectedFile) {
        currentUrl = selectedFile.preview
    }
    const click = () => {
        fileInputRef.current!.click()
    }
    return (
        <>
            <input
                style={{ display: 'none' }}
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleAcceptedFile(e.target.files![0] as any, onFileUpload)}
            />
            <InputGroup>
                <Form.Control key={name} disabled={true} {...(register ? register(name) : {})} name={name} />
                <Button onClick={click}>업로드</Button>
            </InputGroup>
        </>
    )
}

export { FormFileUploader }
