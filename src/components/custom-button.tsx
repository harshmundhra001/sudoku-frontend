function CustomButton(props: { callback: () => void; buttonText: string; isPrimary?: boolean; className?: string, disabled?: boolean }) {
	const { callback, buttonText, isPrimary, className } = props;
	const buttonClass = `text-xl rounded-xl p-3 ${
		isPrimary ? ' bg-primary hover:bg-prim-dark text-white' : 'bg-secondary hover:bg-sec-dark text-gray-900'
	} transition-colors duration-300 ${className}`;

	return (
		<button onClick={callback} className={buttonClass}>
			{buttonText}
		</button>
	);
}

export default CustomButton;
