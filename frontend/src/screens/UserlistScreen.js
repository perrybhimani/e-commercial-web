import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import  Rating  from '../components/Rating';
import { listUsers, deleteUser } from '../actions/userActions';

import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';

function UserlistScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(listUsers());
      console.log(users)
      return () => {
        //
      };
    }, [dispatch]);
  
    const deleteHandler = (e) => {
     
      if (window.confirm('Are you sure?')) {
        dispatch(deleteUser(e._id));
    }
  }
    return  (
      <div>
        <h1>Users</h1>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {users && (
          <MessageBox variant="success">User Deleted Successfully</MessageBox>
        )}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>IS SELLER</th>
                <th>IS ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isSeller ? 'YES' : ' NO'}</td>
                  <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                  <td>
                    <button
                      type="button"
                      className="small"
                      onClick={() => props.history.push(`/user/${user._id}/edit`)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="small"
                      onClick={() => deleteHandler(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
  
  export default UserlistScreen;