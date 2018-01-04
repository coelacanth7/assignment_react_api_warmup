import React from "react";
import Input from "./elements/Input";
import InputGroup from "./elements/InputGroup";
import Button from "./elements/Button";

const UserForm = ({ onSubmit, head, user, onChange }) => (
	<form className="container" onSubmit={onSubmit}>
		<h1>{head}</h1>
		<InputGroup name="first_name" labelText="First Name">
			<Input
				onChange={onChange}
				name="first_name"
				value={user ? user.first_name : ""}
			/>
		</InputGroup>
		<InputGroup name="last_name" labelText="Last Name">
			<Input
				name="last_name"
				value={user ? user.last_name : ""}
				onChange={onChange}
			/>
		</InputGroup>
		<InputGroup name="avatar" labelText="Photo Link">
			<Input
				name="avatar"
				value={user ? user.avatar : ""}
				onChange={onChange}
			/>
		</InputGroup>
		<Button type="submit" color="primary">
			Save User
		</Button>
	</form>
);

export default UserForm;
