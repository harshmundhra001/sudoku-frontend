export interface SudokuCellProps {
	value: number | null;
	notes: number[];
	isIncorrect: boolean;
	isEditable: boolean;
	isActive: boolean; // If this is the currently selected cell
	isInBlock: boolean; // If cell is in same row/col/block as active cell
	numberFocus: number | null; // Currently selected number
	onFocus: () => void; // Cell focus handler
	onValueChange: (value: number | null) => void; // Handle number input
	onNoteChange: (value: number) => void; // Handle note toggle
}

export interface SudokuBoardProps {
	gameState: {
		board: (number | null)[][];
		notes: number[][][];
		incorrect: boolean[][];
		editable: boolean[][];
	};
	cellFocus: { x: number; y: number } | null;
	numberFocus: number | null;
	onCellFocus: (x: number, y: number) => void;
	onValueChange: (x: number, y: number, value: number | null) => void;
	onNoteChange: (x: number, y: number, value: number) => void;
}

export interface GameState {
	board: (number | null)[][];
	notes: number[][][];
	incorrect: boolean[][];
	editable: boolean[][];
	numberCount: number[]; // Count of remaining numbers (1-9)
}

export type SudokuBlockProps = {
	addNote: boolean;
	isEditable: boolean;
	initialValue: number | null;
	// x: number;
	// y: number;
	numberFocus?: number | null;
	isBlockFocus?: boolean;
	// onFocus: (x: number, y: number, val: number | null) => void;
};

export interface SudokuBoardProps2 {
	addNote: boolean;
	initialBoard: (number | null)[][];
	editBoard: boolean[][];
	focusValue: Record<string, number | null>;
}