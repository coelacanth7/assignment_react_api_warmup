import React, { Component } from "react";
import App from "../components/App";
import serialize from "form-serialize";

class AppContainer extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			isFetching: false,
			error: null,
			isEditing: false,
			user: {
				first_name: "",
				last_name: "",
				avatar: "",
				id: ""
			}
		};
	}

	componentDidMount() {
		this.setState({ isFetching: true });

		fetch("https://reqres.in/api/users?delay=1")
			.then(response => response.json())
			.then(json => {
				this.setState({
					users: json.data,
					isFetching: false
				});
			});
	}

	onAddUser = e => {
		e.preventDefault();
		const form = e.target;
		const body = serialize(form, { hash: true });

		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const options = {
			headers,
			method: "POST",
			body: JSON.stringify(body)
		};

		this.setState({ isFetching: true });

		fetch("https://reqres.in/api/users", options)
			.then(response => {
				// If response not okay, throw an error
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`);
				}

				// Otherwise, extract the response into json
				return response.json();
			})
			.then(json => {
				// Update the user list and isFetching.
				// Reset the form in a callback after state is set.
				this.setState(
					{
						isFetching: false,
						users: [...this.state.users, json]
					},
					() => {
						form.reset();
					}
				);
			})
			.catch(error => {
				// Set error in state & log to console
				console.log(error);
				this.setState({
					isFetching: false,
					error
				});
			});
	};

	onDeleteUser = e => {
		e.preventDefault();
		const userId = e.target.name;

		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const options = {
			headers,
			method: "DELETE"
		};

		console.log("deleting");

		this.setState({ isFetching: true });

		fetch(`https://reqres.in/api/users/${userId}`, options)
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`);
				}

				console.log("deleting");
				return true;
			})
			.then(() => {
				const newUsers = this.state.users.filter(e => e.id != userId);

				this.setState({
					isFetching: false,
					users: newUsers
				});

				console.log("deleted");
			})
			.catch(error => {
				console.log(error);
				this.setState({
					isFetching: false,
					error
				});
			});
	};

	onEditUser = e => {
		e.preventDefault();
		let userId = e.target.name;
		let thisUser = this.state.users.find(el => el.id == userId);
		this.setState({
			isEditing: true,
			user: {
				first_name: thisUser.first_name,
				last_name: thisUser.last_name,
				avatar: thisUser.avatar,
				id: thisUser.id
			}
		});
	};

	onSaveEditUser = e => {
		e.preventDefault();
		const form = e.target;
		const body = serialize(form, { hash: true });

		const headers = new Headers();
		headers.append("Content-Type", "application/json");

		const options = {
			headers,
			method: "PUT",
			body: JSON.stringify(body)
		};

		this.setState({ isFetching: true });

		const userId = this.state.user.id;

		fetch(`https://reqres.in/api/users/${userId}`, options)
			.then(response => {
				if (!response.ok) {
					throw new Error(`${response.status} ${response.statusText}`);
				}

				return response.json();
			})
			.then(json => {
				console.log("json response", json);
				var newUsers = [];

				this.state.users.forEach(user => {
					if (user.id == userId) {
						newUsers.push(json);
					} else {
						newUsers.push(user);
					}
				});

				this.setState(
					{
						isFetching: false,
						users: newUsers,
						isEditing: false,
						user: {
							first_name: "",
							last_name: "",
							avatar: "",
							id: ""
						}
					},
					() => {
						form.reset();
					}
				);
			})
			.catch(error => {
				// Set error in state & log to console
				console.log(error);
				this.setState({
					isFetching: false,
					error
				});
			});
	};

	onChangeInput = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		return (
			<App
				onAddUser={this.onAddUser}
				onDeleteUser={this.onDeleteUser}
				onEditUser={this.onEditUser}
				onSaveEditUser={this.onSaveEditUser}
				onChange={this.onChangeInput}
				{...this.state}
			/>
		);
	}
}

export default AppContainer;
