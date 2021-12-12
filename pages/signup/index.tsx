import useFormFields from '../../hooks/useFormFields.hook';
import useFormSubmit from '../../hooks/useFormSubmit.hook';
import UseFormSubmit from '../../types/UseFormSubmit';
import { useCallback } from 'react';
import { postNewMailingListUser } from '../../services/mailingListUsers.services';
import TMailingListUser from '../../types/_MailingListUser';
import US_STATES from '../../json/US_STATES.json';

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

  const onSubmit = useCallback(async (): Promise<{
    error: string;
    success: boolean;
  }> => {
    const {
      success,
      newUser,
      error = '',
    } = await postNewMailingListUser(fields);

    return { error, success };
  }, [fields]);

  const { isSent, submitLoading, submitError, handleSubmit }: UseFormSubmit =
    useFormSubmit(onSubmit);

  const { firstName, lastName, email, city, state, country, zipCode } = fields;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__column">
        <input name="firstName" value={firstName} onChange={handleChange} />
        <input name="lastName" value={lastName} onChange={handleChange} />
        <input
          placeholder="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={handleChange}
        />
        <input name="city" value={city} onChange={handleChange} />

        <select name="state" value={state} onChange={handleChange}>
          {Object.entries(US_STATES).map(([abbreviation, name]) => (
            <option value={abbreviation}>{name}</option>
          ))}
        </select>

        <input
          name="country"
          value={country}
          required
          onChange={handleChange}
        />
        <input name="zipCode" value={zipCode} onChange={handleChange} />
      </div>
      <button type="submit">submit</button>
    </form>
  );
}
