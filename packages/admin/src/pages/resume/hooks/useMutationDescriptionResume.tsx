import { upsertResumeDescription } from 'api'
import { ResumeFormData } from 'components/resume/hooks/useResumeForm'
import { useMutation } from 'react-query'

const useMutationDescriptionResume = () => {
    const mutation = useMutation((data: ResumeFormData) => {
        return upsertResumeDescription(data.id!!, { data_list: data.descriptions })
    })
    return mutation
}

export default useMutationDescriptionResume
