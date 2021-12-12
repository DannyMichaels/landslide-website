import { useState } from 'react';

export default function useFormFields(initialState: Object) {
  const [fields, setValues] = useState(initialState);

  const handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    setValues({
      ...fields,
      [name]: value,
    });
  };

  return [fields, handleChange];
}
