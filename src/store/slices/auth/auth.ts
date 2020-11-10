import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IAuthState {
  token: string | undefined
}

const initialState: IAuthState = {
  token: undefined,
}

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    logout: (state) => {
      state.token = undefined
    },
  },
})

export default auth
