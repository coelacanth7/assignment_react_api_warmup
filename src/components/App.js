import React, { Component } from "react";
import "../App.css";
import JumbotronFluid from "../elements/JumbotronFluid";
import UserList from "./UserList";

class App extends Component {
	constructor() {
		super();

		// Initialize users in state as an empty array and
		// set isFetching to false.
		this.state = {
			users: [],
			isFetching: false
		};
	}

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
			</div>
		);
	}
}

export default App;
