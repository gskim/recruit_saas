import { useState } from 'react'
import { FieldErrors, Control, Controller } from 'react-hook-form'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { CompanySearchOption } from 'appConstants/options'
import { companyList } from 'api'
import { Form } from 'react-bootstrap'

type CompanySearchInputProps = {
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
    onChange: (v: CompanySearchOption | null) => void
    defaultValue?: CompanySearchOption
}

const CompanySearchInput = (props: CompanySearchInputProps) => {
    const [companyLoading, setCompanyLoading] = useState<boolean>(false)
    const [companyOptions, setCompanyOptions] = useState<CompanySearchOption[]>([])

    return (
        <Form.Group className={props.containerClass}>
            {props.label ? <Form.Label className={props.labelClassName}>{props.label}</Form.Label> : null}
            <Controller
                name={props.name}
                control={props.control}
                render={({ field }) => (
                    <AsyncTypeahead
                        {...field}
                        defaultSelected={field.value ? [field.value] : undefined}
                        disabled={props.disable}
                        id={props.id}
                        isLoading={companyLoading}
                        multiple={false}
                        useCache={false}
                        onChange={(v) => {
                            if (v && v.length) {
                                field.onChange(v[0])
                            }
                            props.onChange && props.onChange(v && v.length ? (v[0] as CompanySearchOption) : null)
                        }}
                        options={companyOptions}
                        onSearch={async (query) => {
                            setCompanyLoading(true)
                            const result = await companyList({ skip: 0, limit: 5, name: query })
                            setCompanyLoading(false)
                            if (result.data.data) {
                                const itemList = result.data.data.item_list
                                setCompanyOptions(
                                    itemList.map((item) => {
                                        return {
                                            value: item.id,
                                            label: item.name_ko,
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

export default CompanySearchInput
