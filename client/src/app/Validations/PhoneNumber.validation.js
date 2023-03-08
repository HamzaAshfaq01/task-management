// @ts-nocheck
import React from 'react'
import { IMaskInput } from 'react-imask'
import * as Yup from 'yup'

export const TextMaskPhoneNumber = React.forwardRef(
  function TextMaskPhoneNumber(props, ref) {
    const { onChange, ...other } = props

    const phone = props.value.split('-').join('').length

    return (
      <IMaskInput
        {...other}
        mask={phone === 9 ? '0-####-#####' : '0##-###-####'}
        definitions={{
          '0': /[0]/,
          '#': /[0-9]/,
        }}
        inputRef={(el) => {
          if (typeof ref === 'function') {
            ref(el)
          } else if (ref) {
            // @ts-ignore
            ref.current = el
          }
        }}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    )
  }
)

export const ValidatePhoneNumber = () => {
  const validate = {
    phone_number: Yup.string()
      .min(11, 'Fill out the information in the correct format.')
      .max(12, 'Fill out the information in the correct format.')
      .required('Please enter phone  number'),
  }

  return validate
}
