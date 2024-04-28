import React from "react";

const Toast = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div
			onClick={onClose}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0, 0, 0, 0.7)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<div
				style={{
					backgroundColor: "#e9ecef",
					position: "absolute",
					top: "20vh",
					height: "25vh",
					width: "30vw",
					padding: "20px",
					border: "1px solid grey",
					borderRadius: "10px",
				}}>
				{children}
			</div>
		</div>
	);
};

export default Toast;

