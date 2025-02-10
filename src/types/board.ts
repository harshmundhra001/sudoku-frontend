export type SudokuBoardProps = {
	addNote: boolean;
	initialBoard: { initialValue: number | null; isEditable: boolean }[][]; // 9x9 array of numbers or null
    code: string;
};

export type SudokuBlockProps = {
	addNote: boolean;
	isEditable: boolean;
	initialValue: number | null;
    x: number;
    y: number;
    code: string;
};
