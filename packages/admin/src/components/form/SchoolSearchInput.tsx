import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { SchoolSearchOption } from 'appConstants/options'
import { schoolList } from 'api'

type SchoolSearchInputProps = {
    id: string
    name: string
    control?: Control<any>
    disable?: boolean
    onChange?: (v: SchoolSearchOption | null) => void
    defaultValue?: SchoolSearchOption
}

const SchoolSearchInput = (props: SchoolSearchInputProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [options, setOptions] = useState<SchoolSearchOption[]>([])

    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <AsyncTypeahead
                    {...field}
                    defaultSelected={field.value ? [field.value] : undefined}
                    disabled={props.disable}
                    id={props.id}
                    isLoading={loading}
                    multiple={false}
                    useCache={false}
                    onChange={(v) => {
                        if (v && v.length) {
                            field.onChange(v[0])
                        }
                        props.onChange && props.onChange(v && v.length ? (v[0] as SchoolSearchOption) : null)
                    }}
                    options={options}
                    onSearch={async (query) => {
                        setLoading(true)
                        const result = await schoolList({ skip: 0, limit: 5, name: query })
                        setLoading(false)
                        if (result.data.data) {
                            const itemList = result.data.data.item_list
                            setOptions(
                                itemList.map((item) => {
                                    return {
                                        value: item.id,
                                        label: item.name,
                                    }
                                })
                            )
                        }
                    }}
                />
            )}
        />
    )
}

export default SchoolSearchInput
