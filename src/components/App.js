import React from "react";
import "../App.css";
import JumbotronFluid from "./elements/JumbotronFluid";
import UserList from "./UserList";
import UserForm from "./UserForm";

const App = ({
	users,
	user,
	isFetching,
	isEditing,
	error,
	onAddUser,
	onDeleteUser,
	onEditUser,
	onSaveEditUser,
	onChange
}) => {
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
				onEditUser={onEditUser}
			/>
			<br />
			{isEditing ? (
				<UserForm
					onSubmit={onSaveEditUser}
					head={`Edit ${user.first_name}`}
					user={user}
					onChange={onChange}
				/>
			) : (
				<UserForm
					onSubmit={onAddUser}
					head="Add New User"
					onChange={onChange}
				/>
			)}
		</div>
	);
};

export default App;
