function CustomButton(props: { callback: () => void; buttonText: string; isPrimary?: boolean; className?: string }) {
	const { callback, buttonText, isPrimary, className } = props;
	const buttonClass = `text-black text-xl py-4 rounded-lg ${
		isPrimary ? ' bg-primary hover:bg-prim-dark' : ' bg-secondary hover:bg-sec-dark'
	} transition-colors duration-300 ${className}`;

	return (
		<button onClick={callback} className={buttonClass}>
			{buttonText}
		</button>
	);
}

export default CustomButton;
