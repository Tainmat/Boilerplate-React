import { ReactNode } from 'react'

import { NumericFormat, NumberFormatValues } from 'react-number-format'

import { Label } from 'components/Core/Form/Label'
import { HelperText } from 'components/Core/Form/HelperText'

import { Container } from './InputNumber.styles'

interface Props {
  size?: 'sm' | 'lg'
  label?: string
  tooltip?: string
  name: string
  placeholder?: string
  value?: string | number
  addonText?: string | number | ReactNode
  addonPlacement?: 'left' | 'right'
  prefix?: string
  decimalScale?: number
  error?: boolean
  helperText?: string
  readOnly?: boolean
  disabled?: boolean
  onChange?: (value: number | string) => void
}

export function InputNumber({
  size,
  label,
  tooltip,
  name,
  placeholder,
  value,
  addonText,
  addonPlacement,
  prefix,
  decimalScale,
  error,
  helperText,
  readOnly,
  disabled,
  onChange
}: Props) {
  function handleOnValueChange(values: NumberFormatValues) {
    onChange && onChange(values.floatValue || '')
  }

  return (
    <Container
      size={size}
      addonPlacement={addonText ? addonPlacement || 'left' : undefined}
      hasValue={true}
      error={error}
      readOnly={readOnly}
      disabled={disabled}
    >
      {label && (
        <Label htmlFor={name} tooltip={tooltip}>
          {label}
        </Label>
      )}

      <div className="input">
        <NumericFormat
          name={name}
          placeholder={placeholder}
          value={value}
          type="text"
          prefix={prefix}
          decimalSeparator=","
          thousandSeparator="."
          decimalScale={decimalScale}
          allowNegative={false}
          fixedDecimalScale={false}
          readOnly={readOnly}
          disabled={disabled}
          onValueChange={values => handleOnValueChange(values)}
        />
      </div>

      {helperText && <HelperText text={helperText} />}
    </Container>
  )
}

InputNumber.defaultProps = {
  size: undefined,
  label: undefined,
  tooltip: undefined,
  placeholder: undefined,
  value: undefined,
  addonText: undefined,
  addonPlacement: undefined,
  prefix: undefined,
  decimalScale: undefined,
  error: undefined,
  helperText: undefined,
  readOnly: undefined,
  disabled: undefined,
  onChange: undefined
}
