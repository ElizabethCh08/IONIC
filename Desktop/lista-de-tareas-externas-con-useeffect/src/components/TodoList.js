import React, { useEffect, useState } from 'react';
import '../styles/todoList.css';
import Spinner from './Spinner';

const TodoList = () => {

    const [ allTask, setallTask ] = useState( [] );
    const [ completed, setCompleted ] = useState( [] );
    const [ darkMode, setDarkMode ] = useState( false );
    const [ userInfo, setUserInfo ] = useState( null );

    useEffect( () => {
        const getData = async() => {
            const data = await fetch( 'https://jsonplaceholder.typicode.com/users/1' );
            const dataJson = await data.json();
            setUserInfo( dataJson );
        };
        getData();
    }, [] );

    useEffect( () => {
        console.log( 'efecto', allTask.length );
        if( allTask.length > 0 ) {
            document.title = `${ allTask.length } tareas pendientes`;
        } else {
            document.title = `Tareas`;
        }
    }, [ allTask ] );

    useEffect( () => {
        console.log( 'El nuevo estado es: ', darkMode
            ? 'DARK MODE'
            : 'LIGHT  MODE' );
    }, [ darkMode ] );

    useEffect( () => {
        console.log( 'El componente se monto' );



        return () => {
            console.log( 'El componnte se desmonto' );

        };
    } );


    const handleAddTask = () => {
        const task = document.querySelector( '#task' ).value;
        setallTask( prevState => [ ...prevState, task ] );
        document.querySelector( '#task' ).value = '';
    };

    const handleDeleteTask = ( index ) => {
        setallTask( ( prevState ) => {
            return prevState.filter( ( task, i ) => i !== index );
        } );
    };

    const handleCompleteTask = ( index ) => {
        setCompleted( ( prevState ) => [
            ...prevState,
            allTask[ index ]
        ] );

        handleDeleteTask( index );
    };

    const handleDarkMode = () => {
        setDarkMode( ( prevDarkMode ) => !prevDarkMode );
    };

    return (
        <div className={ darkMode
            ? 'dark-mode'
            : '' }>

            <div>
                <h1>Información del usuario</h1>
                {
                    userInfo
                        ?
                        <ul>
                            <li>{ userInfo.name }</li>
                            <li>{ userInfo.email }</li>
                            <li>{ userInfo.website }</li>
                            <li>{ userInfo.phone }</li>
                        </ul>
                        : <Spinner />
                }
            </div>


            <button onClick={ handleDarkMode }>
                Cambiar a modo { darkMode
                ? 'claro'
                : 'oscuro' }
            </button>

            <div>
                <label htmlFor='task'>Tarea</label>
                <input type='text' id='task' />

                <button onClick={ handleAddTask }>Agregar tarea</button>
            </div>
            <br/>
            <h1>Lista de tareas pendientes ({ allTask.length } en total)</h1>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>

                </tr>
                </thead>
                <tbody>
                {
                    allTask.map( ( task, index ) => (
                            <tr key={ index }>
                                <td>{ task }</td>
                                <td>
                                    <button onClick={ () => handleDeleteTask( index ) }>Eliminar</button>
                                </td>
                                <td>
                                    <button onClick={ () => handleCompleteTask( index ) }>Completa</button>
                                </td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>

            <h1>Lista de tareas completas ({ completed.length } en total)</h1>
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                </tr>
                </thead>
                <tbody>
                {
                    completed.map( ( task, index ) => (
                            <tr key={ index }>
                                <td>{ task }</td>
                            </tr>
                        )
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;