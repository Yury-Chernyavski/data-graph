import "./Node.css";

export const Node = ({children, className}: {children: JSX.Element[] | JSX.Element, className: string}) => {
	return (
		<div className={`node ${className}`}>
			{children}
		</div>
	)
}
