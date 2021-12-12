import { useState } from 'react';

export default function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...fields,
      [name]: value,
    });
  };

  return [fields, handleChange];
}
