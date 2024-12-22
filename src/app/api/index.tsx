const API_BASE_URL = 'http://localhost:8080';

const createSudokuGame = async (difficulty: number) => {
	const response = await fetch(`${API_BASE_URL}/game/create`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ difficulty }),
	});
	if (!response.ok) throw new Error('Failed to fetch board');

    const data = await response.json();
    console.log(data);
	return response.json();
};

// const saveSudokuBoard = async (code: string) => {
// 	const response = await fetch(`${API_BASE_URL}/save`, {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify({ code }),
// 	});
// 	if (!response.ok) throw new Error('Failed to save board');
// 	return response.json();
// };

createSudokuGame(2);

