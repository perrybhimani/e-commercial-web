import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';

import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function RegisterScreen(props) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  },[userInfo, props.history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password != rePassword ){
    alert('Password and confirm password are not match');
    }
    else{
      dispatch(register(name, email, password));
    }
  }
  return <div >
    <form className="form" onSubmit={submitHandler} >
     
        <div>
          <h2>Create Account</h2>
        </div>
        <div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        </div>
        <div>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" required onChange={(e) => setName(e.target.value)}>
          </input>
        </div>
        <div>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" required onChange={(e) => setEmail(e.target.value)}>
          </input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}>
          </input>
        </div>
        <div>
          <label htmlFor="rePassword">Re-Enter Password</label>
          <input type="password" id="rePassword" name="rePassword" required onChange={(e) => setRePassword(e.target.value)}>
          </input>
        </div>
        <div>
          <button type="submit" className="button primary">Register</button>
        </div>
        <div>
        <div>
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>

    </form>
  </div>
}
export default RegisterScreen;