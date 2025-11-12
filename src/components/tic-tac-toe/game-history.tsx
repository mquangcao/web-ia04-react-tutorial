import { IconArrowDown, IconArrowUp } from '@tabler/icons-react';
import { Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import { HistoryEntry } from '@/types';

interface GameHistoryProps {
  /** Lịch sử tất cả các nước đi */
  history: HistoryEntry[];
  /** Nước đi hiện tại đang xem */
  currentMove: number;
  /** Có đang sắp xếp tăng dần không */
  isAscending: boolean;
  /** Callback khi toggle sắp xếp */
  onToggleSort: () => void;
  /** Callback khi jump đến một nước đi */
  onJumpTo: (move: number) => void;
}

/**
 * Component hiển thị lịch sử các nước đi
 */
export function GameHistory({
  history,
  currentMove,
  isAscending,
  onToggleSort,
  onJumpTo,
}: GameHistoryProps) {
  // Tạo danh sách moves
  const moves = history.map((entry, move) => {
    const isCurrentMove = move === currentMove;

    let description: string;
    if (move > 0 && entry.location) {
      const { row, col } = entry.location;
      description = `Đi đến nước đi #${move} (${row}, ${col})`;
    } else {
      description = 'Đi đến đầu game';
    }

    // Nếu là nước đi hiện tại, hiển thị text thay vì button
    if (isCurrentMove && move > 0) {
      return (
        <li key={move}>
          <Text fw={700} c="blue" size="sm">
            📍 Bạn đang ở nước đi #{move}
            {entry.location && ` (${entry.location.row}, ${entry.location.col})`}
          </Text>
        </li>
      );
    }

    return (
      <li key={move}>
        <Button
          onClick={() => onJumpTo(move)}
          variant="subtle"
          size="sm"
          disabled={isCurrentMove}
          fullWidth
          justify="flex-start"
        >
          {description}
        </Button>
      </li>
    );
  });

  // Toggle ascending/descending
  const sortedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <Stack gap="md">
      <Group justify="space-between" align="center">
        <Title order={4}>Lịch sử nước đi</Title>
        <Button
          variant="light"
          size="xs"
          onClick={onToggleSort}
          leftSection={isAscending ? <IconArrowDown size={16} /> : <IconArrowUp size={16} />}
        >
          {isAscending ? 'Giảm dần' : 'Tăng dần'}
        </Button>
      </Group>
      <Box
        component="ol"
        style={{
          paddingLeft: 20,
          maxHeight: 400,
          overflowY: 'auto',
        }}
      >
        {sortedMoves}
      </Box>
    </Stack>
  );
}
