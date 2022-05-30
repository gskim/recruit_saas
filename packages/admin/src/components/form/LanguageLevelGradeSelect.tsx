import { Control, Controller } from 'react-hook-form'
import { languageLevelGradeOptions } from 'appConstants/options'
import Select from 'react-select'

type LanguageLevelGradeSelectProps = {
    name: string
    control?: Control<any>
    disable?: boolean
}

const LanguageLevelGradeSelect = (props: LanguageLevelGradeSelectProps) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <Select
                    isDisabled={props.disable}
                    isMulti={false}
                    isClearable
                    options={languageLevelGradeOptions}
                    classNamePrefix="react-select"
                    {...field}
                ></Select>
            )}
        />
    )
}

export default LanguageLevelGradeSelect
