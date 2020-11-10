import auth, { IAuthState } from './auth'
import selectAuthStatus from './selectors/selectAuthStatus'
import selectIsLoggedIn from './selectors/selectIsLoggedIn'
import selectUsername from './selectors/selectUsername'
import login from './thunks/login'
import logout from './thunks/logout'

export const authReducer = auth.reducer
export { login }
export { logout }
export { selectAuthStatus }
export { selectIsLoggedIn }
export { selectUsername }
export type { IAuthState }
