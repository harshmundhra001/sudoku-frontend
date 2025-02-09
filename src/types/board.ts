export type SudokuBoardProps = {
	addNote: boolean;
	initialBoard: { initialValue: number | null; isEditable: boolean }[][]; // 9x9 array of numbers or null
};

export type SudokuBlockProps = {
	addNote: boolean;
	isEditable: boolean;
	// setBlock: React.Dispatch<React.SetStateAction<number | null>>;
	// grid: boolean[][];
	initialValue: number | null;
};
