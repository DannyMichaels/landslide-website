import useFormFields from '../../hooks/useFormFields.hook';

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

  return <div>Join mailing list</div>;
}
