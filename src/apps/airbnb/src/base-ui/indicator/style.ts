import styled from "styled-components";


export const IndicatorWrapper = styled.div`

  overflow:hidden;

  .i-content {
    psition: relative;
    display: flex;
    transition: transform 200ms ease;
    >*{
      flex-shrink: 0;
    }
  }
  
`