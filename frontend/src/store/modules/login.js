import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, getMemberInfo } from "../../api/MemberApi";
import { setCookie, getCookie } from "../../utils/Cookies";

export const fetchTokenByLogin = createAsyncThunk(
  "login/fetchTokenByLogin",
  async ({ id, password }) => {
    const res = await login(id, password);
    return res;
  }
);

export const fetchMemberByToken = createAsyncThunk(
  "login/fetchMemberByToken",
  async () => {
    const res = await getMemberInfo(getCookie("accessToken"));
    return res;
  }
);

const initialState = {
  isLogin: false,
  accessToken: "",
  refreshToken: "",
  loading: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isLogin = false;
      state.token = "";
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
  extraReducers: {
    [fetchTokenByLogin.pending]: (state) => {
      state.loading = true;
      console.log("받아오는 중");
    },
    [fetchTokenByLogin.fulfilled]: (state, action) => {
      state.loading = false;
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      const expires = new Date(Date.now() + 1 * 5 * 1000);
      if (action.payload) {
        setCookie("accessToken", accessToken, { expires });
        setCookie("refreshToken", refreshToken, { expires });
      }
    },
    [fetchMemberByToken.pending]: (state) => {
      state.loading = true;
      console.log("인증 중");
    },
    [fetchMemberByToken.fulfilled]: (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.isLogin = true;
      }
      console.log(state.isLogin);
    },
  },
});

export const { logout, setIsLogin } = loginSlice.actions;

export default loginSlice.reducer;
