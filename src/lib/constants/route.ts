export const ROUTE_HOME = '/'
export const ROUTE_LOGIN = '/login'
export const ROUTE_LOGOUT = '/logout'
// Profile
export const ROUTE_PROFILE = '/profile'
export const ROUTE_PROFILE_SETTING = '/profile/setting'
// Dashboard
export const ROUTE_DASHBOARD = '/dashboard'
export const ROUTE_USER = '/dashboard/user'
// Static file
export const ROUTE_DEFAULT_AVATAR = '/media/avatar.png'
export const ROUTE_LOGO = '/logo.svg'
// Error
export const ROUTE_401 = '/error/401'
export const ROUTE_403 = '/error/403'
export const ROUTE_404 = '/error/404'

// Routes requires login to access (start with path)
export const protectedRoutes = [ROUTE_DASHBOARD, ROUTE_PROFILE]
