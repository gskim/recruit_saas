import { JobCategoryModel } from '@recruit/interface'
import { jobCategoryList } from 'api'
import { useQuery } from 'react-query'

interface Props {
    parentId?: number
    depth: number
}

const useJobCategoryList = ({ parentId, depth }: Props) => {
    const { isLoading, error, data, refetch } = useQuery(
        JSON.stringify({ url: 'jobCategories', parentId, depth }),
        async () => {
            if (depth > 0 && !parentId) {
                return [] as JobCategoryModel[]
            } else {
                const result = await jobCategoryList({ parent_id: parentId || undefined })
                if (result.data.data) {
                    return result.data.data.item_list
                } else {
                    console.error(result.data.error)
                    throw new Error(result.data.error?.message)
                }
            }
        },
        { suspense: true }
    )
    return { isLoading, error, data, refetch }
}
export default useJobCategoryList
