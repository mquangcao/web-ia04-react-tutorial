import { useState } from 'react';
import { IconRefresh } from '@tabler/icons-react';
import { Button, Container, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { Board, GameHistory } from '@/components/tic-tac-toe';
import { HistoryEntry } from '@/types';
import { calculateWinner, getLocation } from '@/utils';

const INITIAL_HISTORY: HistoryEntry[] = [{ squares: Array(9).fill(null), location: null }];

/**
 * Component chính của game Tic-Tac-Toe
 */
export function Game() {
  const [history, setHistory] = useState<HistoryEntry[]>(INITIAL_HISTORY);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const winInfo = calculateWinner(currentSquares);

  function handlePlay(nextSquares: HistoryEntry['squares'], squareIndex: number) {
    const location = getLocation(squareIndex);
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function handleReset() {
    setHistory(INITIAL_HISTORY);
    setCurrentMove(0);
    setIsAscending(true);
  }

  function toggleSort() {
    setIsAscending(!isAscending);
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Group justify="space-between" align="center">
          <div>
            <Title order={1}>Tic-Tac-Toe</Title>
            <Text c="dimmed" size="sm">
              Game cờ ca-rô 3x3 cổ điển
            </Text>
          </div>
          <Button
            variant="light"
            color="red"
            leftSection={<IconRefresh size={18} />}
            onClick={handleReset}
          >
            Reset Game
          </Button>
        </Group>

        {/* Game Area */}
        <Group align="flex-start" gap="xl" justify="center">
          <Paper shadow="sm" p="lg" withBorder>
            <Board
              xIsNext={xIsNext}
              squares={currentSquares}
              onPlay={handlePlay}
              winInfo={winInfo}
            />
          </Paper>

          <Paper shadow="sm" p="lg" withBorder style={{ minWidth: 320 }}>
            <GameHistory
              history={history}
              currentMove={currentMove}
              isAscending={isAscending}
              onToggleSort={toggleSort}
              onJumpTo={jumpTo}
            />
          </Paper>
        </Group>
      </Stack>
    </Container>
  );
}
