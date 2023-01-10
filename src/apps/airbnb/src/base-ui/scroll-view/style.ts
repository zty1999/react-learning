import styled from "styled-components";


export const ViewWrapper = styled.div`
  position: relative;
  padding: 8px 0;

  .scroll {
    overflow: hidden;

    .scroll-content {
      display: flex;
      transition: transform 250ms ease;
    }
  }
  .control-wrapper {
    position: absolute;
    z-index: 9;
    width: 48px;
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
    .control {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      text-align: center;
      border-width: 2px;
      border-style: solid;
      border-color: #fff;
      background: #fff;
      box-shadow: 0px 1px 1px 1px rgba(0,0,0,.14);
      cursor: pointer;
      
    }
    &.left {
      left: 0;
      top: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 17%, rgba(255, 255, 255, 0) 100%) !important;
    }

    &.right {
      right: 0;
      top: 50%;
      transform: translate(50%, -50%);
      background: linear-gradient(270deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 17%, rgba(255, 255, 255, 0) 100%) !important;

    }
    
  }
  
`