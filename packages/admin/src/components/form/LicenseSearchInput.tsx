import { useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { LicenseSearchOption } from 'appConstants/options'
import { licenseList } from 'api'

type LicenseSearchInputProps = {
    id: string
    name: string
    control?: Control<any>
    disable?: boolean
    onChange?: (v: LicenseSearchOption | null) => void
    defaultValue?: LicenseSearchOption
}

const LicenseSearchInput = (props: LicenseSearchInputProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [options, setOptions] = useState<LicenseSearchOption[]>([])

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
                        props.onChange && props.onChange(v && v.length ? (v[0] as LicenseSearchOption) : null)
                    }}
                    options={options}
                    onSearch={async (query) => {
                        setLoading(true)
                        const result = await licenseList({ skip: 0, limit: 5, name: query })
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

export default LicenseSearchInput
