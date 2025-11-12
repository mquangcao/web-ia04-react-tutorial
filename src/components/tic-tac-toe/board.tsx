import { Group, Stack, Text } from '@mantine/core';
import { BoardState, WinInfo } from '@/types';
import { isBoardFull } from '@/utils';
import { Square } from './square';

interface BoardProps {
  /** Có phải lượt của X không */
  xIsNext: boolean;
  /** Trạng thái bàn cờ hiện tại */
  squares: BoardState;
  /** Callback khi thực hiện một nước đi */
  onPlay: (nextSquares: BoardState, squareIndex: number) => void;
  /** Thông tin người thắng (nếu có) */
  winInfo: WinInfo | null;
}

/**
 * Component bàn cờ Tic-Tac-Toe
 */
export function Board({ xIsNext, squares, onPlay, winInfo }: BoardProps) {
  function handleClick(i: number) {
    // Không cho click nếu ô đã có giá trị hoặc đã có người thắng
    if (squares[i] || winInfo) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares, i);
  }

  const winningLine = winInfo?.line || [];

  // Xác định trạng thái game
  let status: string;
  if (winInfo) {
    status = `🎉 Người thắng: ${winInfo.winner}`;
  } else if (isBoardFull(squares)) {
    status = '🤝 Kết quả: Hòa!';
  } else {
    status = `🎮 Lượt tiếp theo: ${xIsNext ? 'X' : 'O'}`;
  }

  // Sử dụng 2 loops để render board (3x3)
  const boardRows = [];
  for (let row = 0; row < 3; row++) {
    const squaresInRow = [];
    for (let col = 0; col < 3; col++) {
      const index = row * 3 + col;
      squaresInRow.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          isWinning={winningLine.includes(index)}
        />
      );
    }
    boardRows.push(
      <Group key={row} gap="xs">
        {squaresInRow}
      </Group>
    );
  }

  return (
    <Stack gap="md">
      <Text size="lg" fw={700}>
        {status}
      </Text>
      <Stack gap="xs">{boardRows}</Stack>
    </Stack>
  );
}
