import useFormFields from '../../hooks/useFormFields.hook';
import useFormSubmit from '../../hooks/useFormSubmit.hook';
import UseFormSubmit from '../../types/UseFormSubmit';
import { useCallback } from 'react';
import { postNewMailingListUser } from '../../services/mailingListUsers.services';
import US_STATES from '../../json/US_STATES.json';
import WORLD_COUNTRIES from '../../json/WORLD_COUNTRIES.json';
import styled from 'styled-components';
import NavSpacer from '../../components/shared/Layout/NavSpacer';
import Head from 'next/head';

// join mailing list
export default function Signup() {
  const [fields, handleChange] = useFormFields({
    firstName: '',
    lastName: '',
    email: '',

    city: '',
    state: 'NY',

    country: 'United States',

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
    <>
      <Head>
        <title>Signup | Landslide</title>
        <meta name="description" content="Join the mailing list!" />
        <meta property="og:title" content="Signup | Landslide" data-rh="true" />
        <meta
          property="og:description"
          content="Join the mailing list!"
          data-rh="true"
        />
      </Head>

      <NavSpacer />

      <Form onSubmit={handleSubmit}>
        {submitError && <div className="form__error">Error: {submitError}</div>}

        {!isSent ? (
          <>
            <div className="form__title">
              <h1>Sign Up</h1>
            </div>

            <div className="form__inputs">
              <label htmlFor="firstName">
                First Name{createAsterisk(firstName)}
              </label>
              <input
                name="firstName"
                placeholder="First Name"
                required
                value={firstName}
                onChange={handleChange}
              />
              <label htmlFor="lastName">Last Name</label>

              <input
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={handleChange}
              />

              <label htmlFor="email">Email{createAsterisk(email)}</label>

              <input
                placeholder="Email"
                name="email"
                type="email"
                required
                value={email}
                onChange={handleChange}
              />

              <label htmlFor="city">City</label>

              <input
                name="city"
                placeholder="City"
                value={city}
                onChange={handleChange}
              />

              <label htmlFor="state">State</label>

              <select name="state" value={state} onChange={handleChange}>
                <option value="N/A">N/A</option>
                {Object.entries(US_STATES).map(
                  ([stateAbbreviation, fullStateName]) => (
                    <option key={stateAbbreviation} value={stateAbbreviation}>
                      {fullStateName}
                    </option>
                  )
                )}
              </select>

              {state === 'N/A' && (
                <>
                  <label htmlFor="country">
                    Country{createAsterisk(country)}
                  </label>

                  <select
                    placeholder="Country"
                    name="country"
                    value={country}
                    required
                    onChange={handleChange}>
                    <option value="N/A">N/A</option>

                    {WORLD_COUNTRIES.map(({ name }) => (
                      <option value={name}>{name}</option>
                    ))}
                  </select>
                </>
              )}

              <label htmlFor="zipCode">Zip Code</label>

              <input
                placeholder="Zip Code"
                name="zipCode"
                value={zipCode}
                onChange={handleChange}
              />
              <button type="submit">JOIN</button>
            </div>
          </>
        ) : (
          <div className="form__success">
            <h1>Thank you!</h1>
          </div>
        )}
      </Form>
    </>
  );
}

const Form = styled.form`
  @media (max-width: 640px) {
    margin-top: 20px;
  }

  padding-bottom: 40px;

  .form__error {
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    color: red;
    font-size: 1.2rem;
  }

  .form__inputs {
    align-items: center;
    justify-content: center;
    max-width: 320px;
    width: 98%;
    margin: 0 auto;

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));

    label {
      margin-bottom: 10px;
      margin-top: 10px;
      font-family: 'Montserrat', sans-serif;
      font-size: 1rem;
      font-weight: 700;

      text-transform: uppercase;
    }

    input,
    select {
      padding: 10px 15px;
      margin-bottom: 20px;

      font-family: 'Montserrat', sans-serif;
      font-size: 0.9rem;
      font-weight: 600;

      ::-webkit-input-placeholder {
        /* WebKit browsers */
        text-transform: uppercase;
      }
      :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        text-transform: uppercase;
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        text-transform: uppercase;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10+ */
        text-transform: uppercase;
      }

      ::placeholder {
        /* Recent browsers */
        text-transform: uppercase;
      }
    }
  }

  select {
    text-transform: uppercase;
  }

  button[type='submit'] {
    margin-top: 20px;
    background: black;
    color: #fff;
    border: 2px solid #fff;
    padding: 10px 15px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 1.3rem;
    font-weight: 700;

    transition: all 250ms ease-in-out;

    &:hover {
      background: #fff;
      border: 2px solid #3d3d3d;
      color: #000;
    }
  }

  .form__success {
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
      color: #fff;
      font-family: 'Montserrat', sans-serif;
      text-transform: uppercase;
      font-size: 1.4rem;
    }
  }

  .form__title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    
    h1 {
      margin-top: 0;
      font-family: 1.4rem;
      color #fff;
      font-family: 'Montserrat', sans-serif;
      text-transform: uppercase;
    }
  }
`;

function createAsterisk(str: string) {
  if (str !== '') return '';
  return '*';
}
