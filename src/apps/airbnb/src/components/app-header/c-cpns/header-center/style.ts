import styled from "styled-components";


export const CenterWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: 48px;
  .bar {
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 48px;
    box-sizing: border-box;
    padding: 0 8px;
    border: 1px solid #ddd;
    border-radius: 24px;
    cursor: pointer;
    ${props => props.theme.mixin.boxShadow};

    .text {
      padding: 0 16px;
      color: #222;
      font-weight: 600;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: #fff;
      background-color: ${props => props.theme.color.primaryColor};
    }
  }
  /* .bar-enter { */
  .bar.enter {
    transform: scale(2.857134,1.375) translateY(58px);
    opacity: 0; 
  }
  /* .bar-enter-active { */
  .bar.enter-active {
    transition: all 250ms ease;
    transform: scale(1.0) translateY(0);
    opacity: 1;
  }
  /* .bar-exit { */
  .bar.exit {
    opacity: 0;
  }

  .detail {
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 99;
    transform-origin: 50% 0;
    will-change: transform,opacity;
    /* background-color: #fff; */
    .infos {
      position: absolute;
      top: 60px;
      left: 50%;
      /* left: 0;
      right: 0; */
      transform: translateX(-50%);
    }
  }

  /* .detail-enter { */
  .detail.enter {
    transform: scale(0.35,0.727273) translateY(-58px);
    opacity: 0; 
  }
  /* .detail-enter-active { */
  .detail.enter-active {
    transition: all 250ms ease;
    transform: scale(1.0) translateY(0);
    opacity: 1;
  }
  /* .detail-exit { */
  .detail.exit {
    transform: scale(1.0) translateY(0);
    opacity: 1;
  }
  /* .detail-exit-active { */
  .detail.exit-active {
    transition: all 250ms ease;
    transform: scale(0.35,0.727273) translateY(-58px);
    opacity: 0; 
  }
`