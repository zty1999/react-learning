import styled from "styled-components";


export const SectionWrapper = styled.div`

  display: flex;
  align-items: center;
  padding: 14px;
  border-radius: 40px;
  border: 1px solid #eee;
  background-color: #fff;

  .section-item {
    padding: 0 10px;
    display: flex;

    .info {
      width: 200px;

      .title {
        font-weight: 600;
      }
      .desc {
        white-space: nowrap;
        color: #ccc;
      }
    }

  }
  .divider {
    width: 1px;
    height: auto;
    background-color: #eee;
  }
`