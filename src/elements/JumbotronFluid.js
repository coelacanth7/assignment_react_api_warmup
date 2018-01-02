import React from "react";

const JumbotronFluid = props => {
	const { heading, lead } = props;

	return (
		<div class="jumbotron">
			<h1 class="display-3">{heading}</h1>
			<p class="lead">{lead}</p>
			<hr class="my-4" />
			<p>hey</p>
			<p class="lead">
				<a class="btn btn-primary btn-lg" href="#" role="button">
					Learn more
				</a>
			</p>
		</div>
	);
};

export default JumbotronFluid;
