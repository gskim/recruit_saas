import { useLocation } from 'react-router-dom'

export default function useQueryParam(): URLSearchParams {
    return new URLSearchParams(useLocation().search)
}
