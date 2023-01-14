import styled from "styled-components";


export const TabsWrapper = styled.div`
  display: flex;
  color: ${props => props.theme.isAlpha ? "#fff": "#222"};
  .tab-item {
    margin: 0 16px;
    padding: 6px 0;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      opacity: .8;
      border-bottom: 2px solid ${props => props.theme.isAlpha ? "#fff": "rgba(34, 34, 34,.6)"};
    }
    &.active {
      border-bottom: 2px solid ${props => props.theme.isAlpha ? "#fff": "#222"};
    }
  }
`