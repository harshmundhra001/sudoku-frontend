export type SudokuBoardProps = {
	addNote: boolean;
	initialBoard: (number | null)[][]; // 9x9 array of numbers or null
	editBoard: boolean[][];
	code: string;
	onFocus: (x: number, y: number, val: number | null) => void;
	focusValue: Record<string, number | null>;
	updateNumberCount: (value: number, count?: number) => void;
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
	updateNumberCount: (value: number, count?: number) => void;
};
