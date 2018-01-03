import React, { Component } from "react";
import "../App.css";
import JumbotronFluid from "./elements/JumbotronFluid";
import UserList from "./UserList";
import UserForm from "./UserForm";
import serialize from "form-serialize";

const App = ({ users, isFetching, error, onAddUser }) => {
	return (
		<div className="App">
			<JumbotronFluid
				heading="User CRUD"
				lead="Using an API for User CRUD operations"
			/>
			<UserList users={users} isFetching={isFetching} />
			<br />
			<UserForm onSubmit={onAddUser} />
		</div>
	);
};

export default App;
