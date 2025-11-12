/**
 * Giá trị của một ô trong bàn cờ
 */
export type SquareValue = 'X' | 'O' | null;

/**
 * Trạng thái bàn cờ (9 ô)
 */
export type BoardState = SquareValue[];

/**
 * Thông tin về người thắng và đường thắng
 */
export interface WinInfo {
  /** Người thắng (X hoặc O) */
  winner: SquareValue;
  /** Mảng các index tạo thành đường thắng */
  line: number[];
}

/**
 * Vị trí của một nước đi trên bàn cờ
 */
export interface MoveLocation {
  /** Hàng (0-2) */
  row: number;
  /** Cột (0-2) */
  col: number;
}

/**
 * Một entry trong lịch sử game
 */
export interface HistoryEntry {
  /** Trạng thái bàn cờ tại thời điểm này */
  squares: BoardState;
  /** Vị trí của nước đi (null cho nước đi đầu tiên) */
  location: MoveLocation | null;
}
