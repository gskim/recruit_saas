import { useState } from 'react'
import { FileType } from './index'

export default function useProfileImageUploader(showPreview: boolean = true) {
    const [selectedFile, setSelectedFile] = useState<FileType | null>(null)

    /**
     * Handled the accepted files and shows the preview
     */
    const handleAcceptedFile = (file: FileType, callback?: (file: FileType) => void) => {
        if (showPreview) {
            Object.assign(file, {
                preview: file['type'].split('/')[0] === 'image' ? URL.createObjectURL(file) : null,
                formattedSize: formatBytes(file.size),
            })
            setSelectedFile(file)
        }
        if (callback) callback(file)
    }

    /**
     * Formats the size
     */
    const formatBytes = (bytes: number, decimals: number = 2) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }

    /*
     * Removes the selected file
     */
    const removeFile = (file: FileType) => {
        setSelectedFile(null)
    }

    return {
        selectedFile,
        handleAcceptedFile,
        removeFile,
    }
}
