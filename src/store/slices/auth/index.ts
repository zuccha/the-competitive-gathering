import auth, { IAuthState } from './auth'
import selectIsLoggedIn from './selectors/selectIsLoggedIn'

export const authReducer = auth.reducer
export const login = auth.actions.login
export const logout = auth.actions.logout
export { selectIsLoggedIn }
export type { IAuthState }
