import React from 'react';
import styled from 'styled-components';

const H1 = styled.h1`
  margin: 0;
  padding: 12px;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 4em;
`;

const Header = () => {
  return (
    <H1>video to gif converter</H1>
  )
}

export default Header