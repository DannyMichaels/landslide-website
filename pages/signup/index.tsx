import useFormFields from '../../hooks/useFormFields.hook';
import useFormSubmit from '../../hooks/useFormSubmit.hook';
import UseFormSubmit from '../../types/UseFormSubmit';
import { useCallback } from 'react';
import { postNewMailingListUser } from '../../services/mailingListUsers.services';

// join mailing list
export default function Signup() {
  const [fields, handleChange] = useFormFields({
    firstName: '',
    lastName: '',
    email: '',

    city: '',
    state: '',

    country: 'UNITED STATES',

    zipCode: '',
  });

  const onSubmit = useCallback(async () => {
    let payload = createPayload(fields);

    const {
      success,
      newUser,
      error = '',
    } = await postNewMailingListUser(payload);

    return { error };
  }, [fields]);

  const { isSent, submitLoading, submitError, handleSubmit }: UseFormSubmit =
    useFormSubmit(onSubmit);

  return (
    <div>
      <button onClick={handleSubmit}>submit</button>
    </div>
  );
}

interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

function createPayload(fields: FormFields) {
  let payload = {};

  for (const [key, value] of Object.entries(fields)) {
    if (value !== '') {
      payload[key] = value;
    }
  }

  return payload;
}
