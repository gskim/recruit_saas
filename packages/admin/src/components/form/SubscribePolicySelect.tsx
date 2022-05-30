import { Control, Controller } from 'react-hook-form'
import { subscribePolicyOptions, SubscribeSearchOption } from 'appConstants/options'
import Select from 'react-select'

type SubscribePolicySelectProps = {
    name: string
    control?: Control<any>
    className?: string
    disable?: boolean
    onChange?: (v: SubscribeSearchOption | null) => void
    defaultValue?: SubscribeSearchOption
}

const SubscribePolicySelect = (props: SubscribePolicySelectProps) => {
    return (
        <Controller
            name={props.name}
            control={props.control}
            render={({ field }) => (
                <Select
                    isDisabled={props.disable}
                    isMulti={false}
                    options={subscribePolicyOptions}
                    classNamePrefix="react-select"
                    {...field}
                ></Select>
            )}
        />
    )
}

export default SubscribePolicySelect
