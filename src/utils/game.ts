import { BoardState, MoveLocation, WinInfo } from '@/types';

/**
 * Tính toán người thắng và đường thắng
 * @param squares - Trạng thái bàn cờ hiện tại
 * @returns Thông tin người thắng và đường thắng, hoặc null nếu chưa có ai thắng
 */
export function calculateWinner(squares: BoardState): WinInfo | null {
  // Tất cả các tổ hợp có thể thắng
  const lines = [
    [0, 1, 2], // Hàng 1
    [3, 4, 5], // Hàng 2
    [6, 7, 8], // Hàng 3
    [0, 3, 6], // Cột 1
    [1, 4, 7], // Cột 2
    [2, 5, 8], // Cột 3
    [0, 4, 8], // Chéo chính
    [2, 4, 6], // Chéo phụ
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line,
      };
    }
  }

  return null;
}

/**
 * Tính toán vị trí (row, col) từ index của ô
 * @param index - Index của ô (0-8)
 * @returns Vị trí dạng {row, col}
 */
export function getLocation(index: number): MoveLocation {
  return {
    row: Math.floor(index / 3),
    col: index % 3,
  };
}

/**
 * Kiểm tra xem bàn cờ đã đầy chưa (trò chơi hòa)
 * @param squares - Trạng thái bàn cờ hiện tại
 * @returns true nếu tất cả ô đã được điền
 */
export function isBoardFull(squares: BoardState): boolean {
  return squares.every((square) => square !== null);
}
