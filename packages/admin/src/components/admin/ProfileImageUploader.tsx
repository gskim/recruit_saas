import Dropzone from 'react-dropzone'
import useProfileImageUploader from '../FileUploader/useProfileImageUploader'
import { FileType } from '../FileUploader/type'
import classNames from 'classnames'
import profile from 'assets/images/profile/profile.jpeg'

type ProfileImageUploaderProps = {
    onFileUpload?: (file: FileType) => void
    showPreview?: boolean
    currentUrl?: string | null
}

const ProfileImageUploader = ({ currentUrl, showPreview = true, onFileUpload }: ProfileImageUploaderProps) => {
    const { selectedFile, handleAcceptedFile, removeFile } = useProfileImageUploader(showPreview)
    if (selectedFile) {
        const type = selectedFile.type.split('/')[1]
        if (type === 'png' || type === 'jpg' || type === 'jpeg') {
            currentUrl = selectedFile.preview
        } else {
            alert('이미지파일만 가능합니다.')
        }
    }
    return (
        <>
            <Dropzone onDrop={(acceptedFiles) => handleAcceptedFile(acceptedFiles[0], onFileUpload)}>
                {({ getRootProps, getInputProps }) => (
                    <div>
                        <div className="dz-message needsclick" {...getRootProps()}>
                            <input {...getInputProps()} />
                            {currentUrl ? (
                                <img
                                    src={currentUrl}
                                    alt=""
                                    className={classNames('img-fluid', 'rounded-circle', 'avatar-xl')}
                                />
                            ) : (
                                <div className="avatar-xl">
                                    <img
                                        src={profile}
                                        alt=""
                                        className={classNames('img-fluid', 'rounded-circle', 'avatar-xl')}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Dropzone>
        </>
    )
}

export { ProfileImageUploader }
