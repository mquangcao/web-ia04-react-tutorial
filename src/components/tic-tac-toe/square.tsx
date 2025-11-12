import { Button } from '@mantine/core';
import { SquareValue } from '@/types';
import classes from './square.module.css';

interface SquareProps {
  /** Giá trị của ô (X, O, hoặc null) */
  value: SquareValue;
  /** Callback khi click vào ô */
  onSquareClick: () => void;
  /** Có phải ô tạo thành đường thắng không */
  isWinning: boolean;
}

/**
 * Component đại diện cho một ô trong bàn cờ
 */
export function Square({ value, onSquareClick, isWinning }: SquareProps) {
  return (
    <Button
      onClick={onSquareClick}
      className={classes.square}
      variant={isWinning ? 'filled' : 'default'}
      color={isWinning ? 'green' : undefined}
      data-winning={isWinning}
    >
      {value}
    </Button>
  );
}
