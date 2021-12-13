import { useState, useCallback } from 'react';

export default function useFormFields(initialState: any) {
  const [fields, setValues] = useState(initialState);

  const handleChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;

    setValues({
      ...fields,
      [name]: value,
    });
  };

  const resetFormFields = useCallback(() => {
    setValues(initialState);
  }, [initialState]);

  return [fields, handleChange, resetFormFields];
}
