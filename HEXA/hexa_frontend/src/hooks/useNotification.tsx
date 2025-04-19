import { useDispatch } from "react-redux";
import { showNotification } from "@/store/notificationSlice.ts";

interface NotificationType {
  title?: string;
  message?: string;
}

const useNotification = () => {
  const dispatch = useDispatch();

  return ({ title, message }: NotificationType) => {
    dispatch(showNotification({ title, message }));
  };
};

export default useNotification;
