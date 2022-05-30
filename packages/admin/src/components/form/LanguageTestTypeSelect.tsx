import { Control, Controller } from 'react-hook-form'
import { languageTestTypeOptions } from 'appConstants/options'
import Select from 'react-select'

type LanguageTestTypeSelectProps = {
    name: string
    control?: Control<any>
    disable?: boolean
}

const LanguageTestTypeSelect = (props: LanguageTestTypeSelectProps) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <Select
                    isDisabled={props.disable}
                    isMulti={false}
                    isClearable
                    options={languageTestTypeOptions}
                    classNamePrefix="react-select"
                    {...field}
                ></Select>
            )}
        />
    )
}

export default LanguageTestTypeSelect
