import { useState } from 'react'
import { FieldErrors, Control, Controller } from 'react-hook-form'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { skills } from 'api'
export type SkillSearchOption = { value: number; label: string; alias: string[] }

type SkillSearchInputProps = {
    id: string
    name: string
    register?: any
    errors?: FieldErrors
    control?: Control<any>
    className?: string
    disable?: boolean
    // onChange: (v: SkillSearchOption[] | null) => void
    defaultValue?: SkillSearchOption
}

const SkillSearchInput = (props: SkillSearchInputProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [options, setOptions] = useState<Array<SkillSearchOption>>([])

    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => {
                return (
                    <AsyncTypeahead
                        {...field}
                        selected={props.defaultValue ? [props.defaultValue] : undefined}
                        disabled={props.disable}
                        id={props.id}
                        isLoading={isLoading}
                        multiple={true}
                        useCache={false}
                        defaultSelected={field.value}
                        filterBy={(option, p) => {
                            const label = (option as SkillSearchOption).label
                            const values: SkillSearchOption[] = (p as any).value
                            if (values) {
                                const labels = values.map((value) => value.label)
                                return !labels.includes(label)
                            }
                            return true
                        }}
                        options={options}
                        onSearch={async (query) => {
                            setIsLoading(true)
                            const result = await skills({ skip: 0, limit: 5, alias: query })
                            setIsLoading(false)
                            if (result.data.data) {
                                const itemList = result.data.data.item_list
                                setOptions(
                                    itemList.map((item) => {
                                        return {
                                            value: item.id,
                                            label: item.name,
                                            alias: item.alias,
                                        }
                                    })
                                )
                            }
                        }}
                    />
                )
            }}
        />
    )
}

export default SkillSearchInput
