import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
    name: "popups",
    initialState: [], // 팝업 창 목록
    reducers: {
        addPopup: (state, action) => {
            state.push(action.payload); // 새 팝업 추가
        },
        closeAllPopups: (state) => {
            state.forEach((popup) => {
                if (popup && !popup.closed) {
                    popup.close(); // 모든 팝업 닫기
                }
            });
            return []; // 상태 초기화
        },
    },
});

export const { addPopup, closeAllPopups } = popupSlice.actions;
export default popupSlice.reducer;