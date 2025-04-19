import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: smaller;
    height: 20px;
`;

export const ModalBody = styled.div`
  padding: 20px;
  text-align: center;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

export const DefaultButton = styled.button`
  /* 스타일 정의 */
    box-shadow: none;
    cursor: pointer;
    color: #000000;
    border-color: #00ff00;
    background-color: #a4a4a4;
    &:hover {
        background-color: #00b0ff;
    }
`;

export const CloseButton = styled(DefaultButton)`
    padding: 0;
    margin: 0;
    background-color: transparent;
    &:hover {
        outline: none; /* 기본 테두리 제거 */
        border: none; /* 호버 상태에서의 테두리 제거 */
        background-color: transparent;
    }

    &:focus {
        outline: none; /* 포커스 상태에서도 테두리 제거 */
    }
`;

export const ConfirmButton = styled(DefaultButton)`
  /* 스타일 정의 */
    margin: auto;
    width: 100px;
    
`;

export const CancelButton = styled(DefaultButton)`
  /* 스타일 정의 */
    margin: auto;
    
    width: 100px;
`;