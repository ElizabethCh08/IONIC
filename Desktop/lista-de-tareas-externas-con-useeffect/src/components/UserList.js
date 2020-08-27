import React, { useState } from 'react';

const UserList = () => {

    const initialUsers = () => {
        return [
            {
                name: 'Elizabeth',
                lastName: 'Chinacalle'
            },
            {
                name: 'Cynthia',
                lastName: 'Chinacalle'
            },
            {
                name: 'Analy',
                lastName: 'Chinacalle'
            }
        ];
    };

    const [users, setUsers]= useState(initialUsers);

    const handleAddUser = () => {
        const name = document.querySelector( '#name' ).value;
        const lastName = document.querySelector( '#lastname' ).value;
        const newUser = {
            name,
            lastName
        };
        setUsers( ( prevState ) => [
            ...prevState,
            newUser
        ] );
    };

    return(
        <div>
            <div>
                <br/>
                <label htmlFor='name'>Nombre: </label>
                <input type='text' id='name' />
                <label htmlFor='lastname'>Apellido: </label>
                <input type='text' id='lastname' />

                <button onClick={ handleAddUser }>Agregar Usuario</button>
            </div>
            <ul>
                {
                    users.map( ( user, index ) => (
                        <li key={ index }>{ user.name } { user.lastName }</li>
                    ) )
                }
            </ul>
        </div>
    );
};

export default UserList;