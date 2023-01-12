import styled from "styled-components";


export const PaginationWrapper = styled.div`
  display:flex;
  justify-content:center;
  
  .info {
    text-align:center;
    .desc {
      margin-top: 16px;
    }
    .MuiPaginationItem-page {
      margin: 0 10px;
      &:hover {
        text-decoration:underline;
      }
      
    }
    .MuiPaginationItem-page.Mui-selected {
      color: #fff;
      background-color: #222;
    }
    .MuiPaginationItem-icon {
      font-size: 24px;
    }
  }
`
