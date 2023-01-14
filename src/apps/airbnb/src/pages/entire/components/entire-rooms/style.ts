import styled from "styled-components";


export const RoomsWrapper = styled.div`
  position:relative;
  margin-top: 128px;
  padding: 40px 20px;
  .title {
    margin: 0 0 10px 10px;
    font-size: 22px;
    font-weight: 700;
    color: #222;
  }
  .list {
    display: flex;
    flex-wrap:wrap;
    
  }
  >.cover {
    position: absolute;
    z-index:99;
    left:0;
    right:0;
    top: 80px;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props)=> props.theme.color.primaryColor};
    background-color: rgba(255,255,255,.7);
  }
`
