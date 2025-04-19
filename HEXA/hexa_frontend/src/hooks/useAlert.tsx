import { useDispatch } from "react-redux";
import { showAlert } from "@/store/modules/alertStore";
import store from "@/store";

interface AlertType {
  title?: string;
  message?: any;
  type?: string;
  onConfirm?: () => Promise<void> | void | undefined
}

let currentOnConfirm: (() => void) | undefined = undefined;

const useAlert = () => {
  // const dispatch = useDispatch();

  return ({ title, message, type, onConfirm }: AlertType) => {
    currentOnConfirm = () => {
      if(onConfirm) {
        Promise.resolve(onConfirm()).catch((error) => {
          console.error('onConfirm failed', error)
        })
      }
    }
    store.dispatch(showAlert({ title, message, type }));
  };
};

export const handleConfirm = () => {
  if (currentOnConfirm) {
    currentOnConfirm();
  }
  currentOnConfirm = undefined;
};


export default useAlert;
