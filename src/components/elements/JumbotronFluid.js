import React from "react";

const JumbotronFluid = props => {
	const { heading, lead } = props;

	return (
		<div className="jumbotron">
			<h1 className="display-3">{heading}</h1>
			<p className="lead">{lead}</p>
			<hr className="my-4" />
			<p>hey</p>
		</div>
	);
};

export default JumbotronFluid;
