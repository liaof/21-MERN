import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  // return the ADD_USER mutation wrapped in a function called 'addUser', which has the ability to error check the mutation query
  const [addUser, { error }] = useMutation(ADD_USER);

  // this function updates the formState's values everytime we change the value of an input field
  // it gets the value that was changed, and the name of the input field it is in
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form (notice the async!)
  const handleFormSubmit = async event => {
    event.preventDefault();

    // use try/catch (async await) instead of promises (.then() .catch()) to handle errors
    // try and catch; destructure the data componenet of the returned object from the ADD_USER mutation
    // use the ADD_USER mutation, with parameters defined by formState, and destruture the data object
    // then use the token in the dataobject to verify login status
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState }
      });
    
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Sign Up</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your username'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
            </form>
            {error && <div>Sign up failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
