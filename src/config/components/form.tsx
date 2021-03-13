import React from 'react';
import styled from '@emotion/styled';

import { ConfigContainer } from '../contexts';

const Component: React.FCX = ({ className }) => {
  const { config, setConfig } = ConfigContainer.useContainer();

  return <div className={className}>設定の必要はありません🍀</div>;
};

const StyledComponent = styled(Component)`
  min-height: calc(100vh - 249px);
`;

export default StyledComponent;
