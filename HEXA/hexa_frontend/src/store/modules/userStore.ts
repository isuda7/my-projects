import { RootState } from '@/store';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { PURGE } from "redux-persist";
import { Menu } from "@/utils/apiService/type/auth/menu.type";

interface UserStore {
	user: any;
	auth: any;
	menu: Array<Menu>;
	roles: any;
	isSignedIn: boolean | undefined;
	tempLoginData: any;
}

const initialState = {
	user: {},
	auth: {},
	menu: [],
	roles: {},
	isSignedIn: false,
	tempLoginData: {
		tempData: null,
		userId: null,
	},
} as UserStore
export const userSlice = createSlice({
	name: 'userStore',
	initialState: initialState,
	reducers: {
		setLogin: (state, action) => {
			const payload = action.payload;
			state.isSignedIn = true;
			state.menu = payload.menu;
			state.auth = {"accessToken":payload.accessToken, "refreshToken" : payload.refreshToken, "expiration": payload.expiration};
			state.user = {"userName": payload.userName, "id": payload.tsid};
			state.roles = payload.role;
		},

		setAuth: (state, action: PayloadAction<any>) => {
			state.auth = action.payload;
		},
		setUser: (state, action: PayloadAction<any>) => {
			state.user = action.payload;
		},
		setMenu: (state, action: PayloadAction<any>) => {
			state.menu = action.payload;
		},
		setRoles: (state, action: PayloadAction<any>) => {
			state.roles = action.payload;
		},

		setTempLogin: (state, action: PayloadAction<any>) => {
			state.tempLoginData = action.payload;
		}

	},
	extraReducers: builder => {
		builder.addCase(PURGE, () => initialState);
	},
});

export const tempSelector = createSelector(
    (state: RootState): any => state.userStore.tempLoginData,
    tempLoginData => {
        return tempLoginData;
    },
);

export const userSelector = createSelector(
    (state: RootState): any => state.userStore.user,
    user => {
        return user;
    },
);

export const roleSelector = createSelector(
	(state: RootState): any => state.userStore.roles,
	roles => {
		return roles;
	},
);

export const authSelector = createSelector(
	(state: RootState): any => state.userStore.auth,
	auth => {
		return auth;
	},
);

export const isSignedInSelector = createSelector(
	(state: RootState): any => state.userStore.auth,
  	auth => {
		const accessToken = auth.accessToken;
		const expired_at = moment(auth.expiration).unix();
		const at_time = moment().unix();
		return accessToken && expired_at > at_time;
	},
);
export const menuSelector = createSelector(
	(state: RootState): any => state.userStore.menu,
	menu => {
		return menu;
	},
);
export const { setAuth, setUser, setLogin, setTempLogin } = userSlice.actions;
export default userSlice.reducer;
