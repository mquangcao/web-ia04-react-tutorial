import '@mantine/core/styles.layer.css';
import './global.css';

import { MantineProvider } from '@mantine/core';
import { Game } from '@/pages/game';
import { theme } from '@/theme';

export function App() {
  return (
    <MantineProvider theme={theme}>
      <Game />
    </MantineProvider>
  );
}
