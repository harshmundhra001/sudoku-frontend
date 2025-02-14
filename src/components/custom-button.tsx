type ButtonType =  "submit" | "reset" | "button" | undefined

function CustomButton(props: { callback: () => void; buttonText: string; isPrimary?: boolean; className?: string, disabled?: boolean, type?: ButtonType }) {
	const { callback, buttonText, isPrimary, className, type } = props;
	const buttonClass = `text-xl rounded-xl p-3 ${
		isPrimary ? ' bg-primary hover:bg-prim-dark text-white' : 'bg-secondary hover:bg-sec-dark text-gray-900'
	} transition-colors duration-300 ${className}`;

	return (
		<button onClick={callback} className={buttonClass} type={type}>
			{buttonText}
		</button>
	);
}

export default CustomButton;
