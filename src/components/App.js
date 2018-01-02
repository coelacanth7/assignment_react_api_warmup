import React, { Component } from "react";
import "../App.css";
import JumbotronFluid from "./elements/JumbotronFluid";
import UserList from "./UserList";
import UserForm from "./UserForm";
import serialize from "form-serialize";

class App extends Component {
	constructor() {
		super();

		// Initialize users in state as an empty array and
		// set isFetching to false.
		this.state = {
			users: [],
			isFetching: false,
			error: null
		};
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

	componentDidMount() {
		// Before performing the fetch, set isFetching to true
		this.setState({ isFetching: true });

		// After component mounts, call the API to get the
		// users, then update state which triggers re-render.
		// Add a delay to the URL and reset isFetching upon
		// completion of the request.
		fetch("https://reqres.in/api/users?delay=3")
			.then(response => response.json())
			.then(json => {
				this.setState({
					users: json.data,
					isFetching: false
				});
			});
	}

	render() {
		const { users, isFetching } = this.state;

		return (
			<div className="App">
				<JumbotronFluid
					heading="User CRUD"
					lead="Using an API for User CRUD operations"
				/>
				<UserList users={users} isFetching={isFetching} />
				<br />
				<UserForm onSubmit={this.onAddUser} />
			</div>
		);
	}
}

export default App;
