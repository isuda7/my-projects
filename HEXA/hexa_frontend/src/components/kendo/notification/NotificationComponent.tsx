import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Notification,
  NotificationGroup,
} from "@progress/kendo-react-notification";
import { hideNotification } from "@/store/notificationSlice.ts";
import { Fade } from "@progress/kendo-react-animation";

const position = {
  topLeft: {
    top: 0,
    left: 0,
    alignItems: "flex-start",
  },
  topCenter: {
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
  },
  topRight: {
    top: 0,
    right: 0,
    alignItems: "flex-end",
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    alignItems: "flex-start",
  },
  bottomCenter: {
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    alignItems: "flex-end",
  },
};

function NotificationComponent() {
  const dispatch = useDispatch();
  const { open, message } = useSelector(
    (state: RootState) => state.notificationStore,
  );

  const handleClose = () => {
    dispatch(hideNotification());
  };

  return (
    <div>
      {open && (
        <NotificationGroup style={position.bottomCenter}>
          <Fade>
            <Notification closable={true} onClose={handleClose}>
              {message}
            </Notification>
          </Fade>
        </NotificationGroup>
      )}
    </div>
  );
}

export default NotificationComponent;
