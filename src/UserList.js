import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

function UserList() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserAddress, setNewUserAddress] = useState('');
    const [newUserCompany, setNewUserCompany] = useState('');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSearchInputChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleAddUserButtonClick = () => {
        setShowAddUserForm(true);
    }

    const handleAddUserFormSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: newUserName,
            email: newUserEmail,
            address: {
                street: newUserAddress
            },
            company: {
                name: newUserCompany
            }
        };

        setUsers([...users, newUser]);
        setShowAddUserForm(false);
        setNewUserName('');
        setNewUserEmail('');
        setNewUserAddress('');
        setNewUserCompany('');
    }

    const handleDeleteUserButtonClick = (userId) => {
        setUsers(users.filter(user => user.id !== userId));
    }

    const filteredUsers = users.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return ( <
        div className = "container" >
        <
        div className = "search-bar" >
        <
        input type = "text"
        className = "search-input"
        id = "search-input"
        placeholder = "Search by username"
        value = { searchTerm }
        onChange = { handleSearchInputChange }
        /> <
        button className = "search-button"
        id = "search-button" >
        Search <
        /button> <
        /div> <
        table className = "user-list"
        id = "user-list" >
        <
        thead >
        <
        tr >
        <
        th > Name < /th> <
        th > Email < /th> <
        th > Address < /th> <
        th > Company < /th> <
        th > < /th> <
        /tr> <
        /thead> <
        tbody > {
            filteredUsers.map(user => ( <
                tr key = { user.id } >
                <
                td > { user.name } < /td> <
                td > { user.email } < /td> <
                td > { user.address.street } < /td> <
                td > { user.company.name } < /td> <
                td >
                <
                button onClick = {
                    () => handleDeleteUserButtonClick(user.id) }
                className = "delete-user-button"
                id = { `delete-user-button-${user.id}` } >
                Delete <
                /button> <
                /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        button onClick = { handleAddUserButtonClick }
        className = "add-user-button"
        id = "add-user-button" >
        Add User <
        /button> {
            showAddUserForm && ( <
                form className = "add-user-form"
                onSubmit = { handleAddUserFormSubmit } >
                <
                input type = "text"
                className = "add-user-input"
                id = "add-user-input-name"
                placeholder = "Name"
                value = { newUserName }
                onChange = {
                    (event) => setNewUserName }
                /> <
                /form>
            )
        } <
        /div>
    )
}



export default UserList;