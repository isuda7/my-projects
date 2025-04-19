import React, {useEffect, useState, useRef} from "react";
// import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import {Button} from "@progress/kendo-react-buttons";
import {persistor} from "@/store";
import {useSelector} from "react-redux";
import {authSelector} from "@/store/modules/userStore.ts";

const SessionTimeout = () => {
    // const navigate = useNavigate();
    const {t} = useTranslation();
    const auth = useSelector(authSelector);
    const [visibleAutoLogout, setVisibleAutoLogout] = useState(false);
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimeout = () => {
        if (timeoutIdRef.current) {
            clearTimeout(timeoutIdRef.current);
        }
        timeoutIdRef.current = setTimeout(() => {
            setVisibleAutoLogout(true);
        }, 60 * 60 * 1000); // 60분
    };

    useEffect(() => {
        const events = ["mousemove", "keydown", "click"];

        events.forEach((event) => window.addEventListener(event, resetTimeout));
        resetTimeout();

        return () => {
            events.forEach((event) => window.removeEventListener(event, resetTimeout));
            if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
        };
    }, [auth]);

    const sessionExtend = () => {
        setVisibleAutoLogout(false);
        resetTimeout();
    };

    const autoLogout = () => {
        window.localStorage.clear();
        persistor.purge().then(() => {
            setVisibleAutoLogout(false);
            // navigate('/sign-in');
        });
    };

    return (
        <div onClick={resetTimeout}>
            {visibleAutoLogout && (
                <Dialog title={t("common.session_expire_title")} onClose={autoLogout}>
                    <div className="dialog-box pop-xs">
                        <div className="content-center">
                            {t("common.session_expire_message").split('\n').map((line, index) => (
                                <div key={index}>{line}</div>
                            ))}
                        </div>
                    </div>
                    <DialogActionsBar>
                        <Button size={"medium"} onClick={sessionExtend} fillMode="outline">
                            {t("common.session_extend_btn")}
                        </Button>
                        <Button
                            size={"medium"}
                            themeColor={"primary"}
                            onClick={autoLogout}
                        >
                            {t("common.logout")}
                        </Button>
                    </DialogActionsBar>
                </Dialog>
            )}
        </div>
    );
};

export default SessionTimeout;