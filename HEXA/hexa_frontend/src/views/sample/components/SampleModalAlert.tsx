import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import ModalComponent from "@/components/kendo/modal/ModalComponent.tsx";
import useAlert from "@/hooks/useAlert.tsx";
import { Dialog } from "@progress/kendo-react-dialogs";;

const SampleModalAlert = () => {
  /**
   * 초기 변수 선언 영역
   */
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const showAlert = useAlert();
  const buttonRef = useRef(null);

  /**
   * 함수 선언 영역
   */
  const onOpenModal = (type: number) => {
    switch(type) {
      case 1 : setOpenModal(true); break;
      case 2 : setOpenModal2(true); break;
      case 3 : setOpenModal3(true); break;
      default: break;
    }
  }

  const onOpenAlert = () => {
    showAlert({ title: 'Alert', message: 'Alert Test?'})
  }

  const onOpenConfirm = () => {
    showAlert({ 
      title: 'Confirm', 
      message: 'Confirm Test?',
      type: 'confirm',
      onConfirm: () => console.log('confirm test')
    })
  }

  const onDelete = () => {
    
  }

  /**
   * 최초 렌더링 이후 동작함수
   */
  useEffect(() => {

  }, [])

  return (
    <>
      <div className="btn-group k-mt-10">
        <div className="panel">
          <Button size="large" fillMode="outline" onClick={() => onOpenModal(1)}>
            Case 1
          </Button>
        </div>
        <div className="panel">
          <Button size="large" fillMode="outline" onClick={() => onOpenModal(2)}>
            Case 2
          </Button>
        </div>
        <div className="panel">
          <Button size="large" fillMode="outline" onClick={() => onOpenModal(3)}>
            Case 3
          </Button>
        </div>
      </div>
      <div className="btn-group k-mt-10">
        <div className="panel">
          <Button size="large" fillMode="outline" onClick={onOpenAlert}>
            Show Alert
          </Button>
        </div>
        <div className="panel">
          <Button size="large" fillMode="outline" onClick={onOpenConfirm}>
            Show Confirm
          </Button>
        </div>
      </div>

      {openModal && (
        <ModalComponent
          onClose={() => setOpenModal(false)}
          onConfirm={() => onDelete()}
          title="삭제"
          buttons={["cancel", "confirm"]}
          showCloseButton={false}
        >
          삭제하시겠습니까?
        </ModalComponent>
      )}
      {/*{*/}
      {/*  openModal2 && <BatterModal toggleDialog={() => setOpenModal2(false)} />*/}
      {/*}*/}
      {
        openModal3 && (
          <Dialog title="Dialog제작 테스트" onClose={() => setOpenModal3(false)}>
            
          </Dialog>
        )
      }
    </>
  )
}

export default SampleModalAlert;
