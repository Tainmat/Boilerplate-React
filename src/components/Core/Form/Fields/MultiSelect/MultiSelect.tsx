import { useRef, useState, useEffect } from 'react'

import { Label } from 'components/Core/Form/Label'
import { Icon } from 'components/Core/Icons/Icon'
import { HelperText } from 'components/Core/Form/HelperText'

import { Options } from './Options'

import { IMultiSelectOption } from './MultiSelect.interface'
import { Container } from './MultiSelect.styles'

interface Props {
  size?: 'sm' | 'lg'
  label: string
  name: string
  placeholder?: string
  options: IMultiSelectOption[]
  initialValue?: string[]
  value?: string[]
  error?: boolean
  helperText?: string
  readOnly?: boolean
  disabled?: boolean
  onChange: (options: IMultiSelectOption[]) => void
  onReset?: () => void
}

export function MultiSelect({
  size,
  label,
  name,
  placeholder,
  options,
  initialValue,
  value,
  error,
  helperText,
  readOnly,
  disabled,
  onChange,
  onReset
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const searchField = useRef<HTMLInputElement | null>(null)

  const [selectValue, setSelectValue] = useState<string[]>(initialValue || [])
  const [selectLabel, setSelectLabel] = useState('')

  const [filter, setFilter] = useState('')

  const [isShowingOptions, setIsShowingOptions] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsShowingOptions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  useEffect(() => {
    if (!isShowingOptions) {
      setFilter('')
      return
    }

    searchField.current?.focus()
  }, [isShowingOptions])

  useEffect(() => {
    if (value) {
      const values: string[] = []
      let label = ''

      options?.forEach(option => {
        if (value.includes(option.value)) {
          values.push(option.value)

          label = `${values.length > 1 ? `${label}, ` : ''} ${option.label}`
        }
      })

      setSelectValue(values)
      setSelectLabel(label)
    }
  }, [value, options])

  function handleOnReset() {
    setSelectValue([])
    setSelectLabel('')

    setIsShowingOptions(false)

    onReset && onReset()
  }

  function handleIcon() {
    if (readOnly || disabled) {
      return (
        <div className="icon expand" style={{ cursor: 'no-drop' }}>
          <Icon
            size={`${!size || size === 'lg' ? 'md' : 'sm'}`}
            icon="expand_more"
          />
        </div>
      )
    }

    if (selectValue && !isShowingOptions && onReset) {
      return (
        <div className="icon reset" onClick={handleOnReset} aria-hidden="true">
          <Icon size={`${!size || size === 'lg' ? 'md' : 'sm'}`} icon="close" />
        </div>
      )
    }

    if (isShowingOptions) {
      return (
        <div className="icon search">
          <Icon
            size={`${!size || size === 'lg' ? 'md' : 'sm'}`}
            icon="search"
          />
        </div>
      )
    }

    return (
      <div
        className="icon expand"
        onClick={() => setIsShowingOptions(true)}
        aria-hidden="true"
      >
        <Icon
          size={`${!size || size === 'lg' ? 'md' : 'sm'}`}
          icon={`${isShowingOptions ? 'expand_less' : 'expand_more'}`}
        />
      </div>
    )
  }

  return (
    <Container
      ref={wrapperRef}
      size={size}
      error={error}
      readOnly={readOnly}
      disabled={disabled}
    >
      <Label htmlFor={name} size={size}>
        {label}
      </Label>

      <div
        className={`select search ${isShowingOptions ? 'open' : ''}`}
        onClick={() => {
          if (!readOnly && !disabled) {
            setIsShowingOptions(isShowing => !isShowing)
          }
        }}
        aria-hidden="true"
      >
        {isShowingOptions ? (
          <span>
            <input
              ref={searchField}
              value={filter}
              placeholder={!isShowingOptions ? selectLabel || placeholder : ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target

                setFilter(value)
              }}
            />
          </span>
        ) : (
          <div>
            <span className={`${selectLabel ? 'has-value' : ''}`}>
              {/* {selectLabel || placeholder} */}
              {options ? selectLabel || placeholder : 'Aguarde...'}
            </span>
          </div>
        )}
      </div>

      <Options
        size={size}
        show={isShowingOptions}
        value={selectValue}
        options={
          !filter
            ? options
            : options.filter(function (option) {
                return option.label
                  .toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .includes(
                    filter
                      .toLowerCase()
                      .normalize('NFD')
                      .replace(/[\u0300-\u036f]/g, '')
                  )
              })
        }
        onChange={options => {
          const values: string[] = []
          let label = ''

          options.forEach(option => {
            values.push(option.value)

            label = `${values.length > 1 ? `${label}, ` : ''} ${option.label}`
          })

          setSelectValue(values)
          setSelectLabel(label)

          setFilter('')

          onChange(options)
        }}
        onClose={() => setIsShowingOptions(false)}
      />

      {handleIcon()}

      {helperText && <HelperText text={helperText} />}
    </Container>
  )
}

MultiSelect.defaultProps = {
  size: undefined,
  placeholder: undefined,
  initialValue: undefined,
  value: undefined,
  error: undefined,
  helperText: undefined,
  readOnly: undefined,
  disabled: undefined,
  onReset: undefined
}
