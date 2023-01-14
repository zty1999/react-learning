import styled from "styled-components";
export const PictureBrowserWrapper = styled.div`
  position:fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 999;

  display: flex;
  flex-direction: column;
  background-color: #333;

  .top {
    position:relative;
    flex-shrink: 0;
    height: 86px;
    .close-btn {
      position: absolute;
      top: 15px;
      right: 25px;
    }
  }

  .slider {
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex:1;
    min-height: 200px;
    overflow: hidden;

    .control {
      position: absolute;
      z-index: 1;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      color: #fff;
      cursor: pointer;
      .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        /* height: 100%; */
        width: 83px;
      }

    }
    .picture {
      position: relative;
      height: 100%;
      overflow: hidden;
      width: 100% !important;
      max-width: 105vh !important;
      img {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: 0 auto;
        height: 100%;
        user-select:none;
      }
      .fade-enter {
        transform: translateX(${(props)=> props.isNext?'100%':'-100%'});
        opacity: 0;
      }
      .fade-enter-acitve {
        transform: translateX(0);
        opacity: 1;
        transition: all 150ms ease;
      }
      .fade-exit {
        opacity: 1;

      }
      .fade-exit-acitve {
        opacity: 0;
        transition: all 150ms ease;
      }
    }

  }

  .preview {
    position: relative;
    /* display: flex;
    justify-content: center; */
    /* height: 100%; */
    height: 100px;
    width: 105vh;
    /* max-width: 105vh; */
    /* width: calc(100% - 83px - 83px) !important; */
    /* margin-top: 10px; */
    margin: 10px auto;
    .info {
      /* position: absolute;
      bottom: 10px; */
      width: 100%;
      max-width: 105vh;
      color: #666;
      .desc {
        display: flex;
        justify-content: space-between;
        .toggle {
          cursor: pointer;
        }
      }
    }
    .list {
      margin-top: 3px;
      overflow: hidden;
      transition: height 300ms ease;
      height: ${props => props.showPreview?'67px':'0'};

      .item {
        margin-right: 15px;
        width: 80px;
        text-align: center;
        background: #222;
        cursor: pointer;
        img {
          height: 67px;
          opacity: 0.5;
        }
        &.active {
          img {
            opacity: 1;
          }
        }
      }
    }
  }

`

