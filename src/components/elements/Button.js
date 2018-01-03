import React from "react";

const Button = props => {
	const { size, color, children, type, onClick, name } = props;
	const sizeClass = size ? `btn-${size}` : "";

	return (
		<button
			name={name}
			onClick={onClick}
			type={type}
			className={`btn btn-${color} ${sizeClass}`}
		>
			{children}
		</button>
	);
};

Button.defaultProps = {
	type: "button",
	color: "default",
	children: "Submit"
};

export default Button;
