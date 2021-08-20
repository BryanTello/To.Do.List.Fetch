import React from "react";
import PropTypes from "prop-types";

const Task = props => {
	return (
		<li className="li.color" onClick={() => props.delete(props.id)}>
			<botton className="suprim">{props.Text}</botton>
		</li>
	);
};

Task.propTypes = {
	Text: PropTypes.string,
	id: PropTypes.string,
	delete: PropTypes.func
};
export default Task;
