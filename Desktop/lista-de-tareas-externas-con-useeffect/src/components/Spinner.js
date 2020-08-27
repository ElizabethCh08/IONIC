import React from 'react';
import logo from '../images/logo.svg';
import '../styles/App.css';
import UserList from './UserList';
import TodoList from './TodoList';

const Spinner = () => (
    <div className='loader'>
        <span></span>
    </div>
);

export default Spinner;
