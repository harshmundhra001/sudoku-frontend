export type SudokuBoardProps = {
    addNote: boolean;
    initialBoard: (number | null)[][]; // 9x9 array of numbers or null
};

export type SudokuBlockProps = {
    addNote: boolean;
    isEditable: boolean;
    // setBlock: React.Dispatch<React.SetStateAction<number | null>>;
    // grid: boolean[][];
    initialValue: number | null;
}