import { Control, Controller } from 'react-hook-form'
import { languageLevelTypeOptions } from 'appConstants/options'
import Select from 'react-select'

type LanguageLevelTypeSelectProps = {
    name: string
    control?: Control<any>
    disable?: boolean
}

const LanguageLevelTypeSelect = (props: LanguageLevelTypeSelectProps) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <Select
                    {...field}
                    isDisabled={props.disable}
                    isMulti={false}
                    isClearable
                    options={languageLevelTypeOptions}
                    classNamePrefix="react-select"
                ></Select>
            )}
        />
    )
}

export default LanguageLevelTypeSelect
