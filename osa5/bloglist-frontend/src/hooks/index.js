import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    console.log('resetataan')
    setValue('')
    console.log('resetattu')
  }

  const getAllButReset = {
    type, value, onChange
  }

  return { type, value, onChange, reset, getAllButReset }
}

