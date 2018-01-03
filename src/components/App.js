import React from "react";
import "../App.css";
import JumbotronFluid from "./elements/JumbotronFluid";
import UserList from "./UserList";
import UserForm from "./UserForm";

const App = ({ users, isFetching, error, onAddUser, onDeleteUser }) => {
	return (
		<div className="App">
			<JumbotronFluid
				heading="User CRUD"
				lead="Using an API for User CRUD operations"
			/>
			<UserList
				users={users}
				isFetching={isFetching}
				onDeleteUser={onDeleteUser}
			/>
			<br />
			<UserForm onSubmit={onAddUser} />
		</div>
	);
};

export default App;
