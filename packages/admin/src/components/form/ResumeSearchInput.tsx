import { useState } from 'react'
import { FieldErrors, Control, Controller } from 'react-hook-form'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { ResumeSearchOption } from 'appConstants/options'
import { resumeList } from 'api'
import { Form } from 'react-bootstrap'

type ResumeSearchInputProps = {
    label?: string
    labelClassName?: string
    containerClass?: string
    id: string
    name: string
    register?: any
    errors?: FieldErrors
    control?: Control<any>
    className?: string
    disable?: boolean
    onChange: (v: ResumeSearchOption | null) => void
    defaultValue?: ResumeSearchOption
    required?: boolean
}

const ResumeSearchInput = (props: ResumeSearchInputProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [options, setOptions] = useState<ResumeSearchOption[]>([])

    return (
        <Form.Group className={props.containerClass}>
            {props.label ? <Form.Label className={props.labelClassName}>{props.label}{props.required && <span style={{ color: 'red' }}> *</span>}</Form.Label> : null}
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
                        onChange={(v) => props.onChange(v && v.length ? (v[0] as ResumeSearchOption) : null)}
                        options={options}
                        onSearch={async (query) => {
                            setLoading(true)
                            const result = await resumeList({ skip: 0, limit: 5, title: query })
                            setLoading(false)
                            if (result.data?.item_list) {
                                const itemList = result.data.item_list
                                setOptions(
                                    itemList.map((item) => {
                                        return {
                                            value: item.id,
                                            label: item.title,
                                        }
                                    })
                                )
                            }
                        }}
                    />
                )}
            />
            {props.errors && props.errors[props.name] ? (
                <Form.Control.Feedback type="invalid">{props.errors[props.name]['message']}</Form.Control.Feedback>
            ) : null}
        </Form.Group>
    )
}

export default ResumeSearchInput
