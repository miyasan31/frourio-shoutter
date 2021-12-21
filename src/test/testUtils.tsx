import { render } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { SWRConfig } from 'swr';

const Providers: FC = ({ children }) => (
  <SWRConfig value={{ dedupingInterval: 0 }}>{children}</SWRConfig>
);

const customRender = (ui: ReactElement, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render };
