export type SudokuBoardProps = {
	addNote: boolean;
	initialBoard: { initialValue: number | null; isEditable: boolean }[][]; // 9x9 array of numbers or null
    code: string;
	onFocus: (x: number, y: number, val: number | null) => void;
	focusValue: Record<string, number | null>
};

export type SudokuBlockProps = {
	addNote: boolean;
	isEditable: boolean;
	initialValue: number | null;
    x: number;
    y: number;
    code: string;
	numberFocus?: number | null;
	isBlockFocus?: boolean;
	onFocus: (x: number, y: number, val: number | null) => void;
};
