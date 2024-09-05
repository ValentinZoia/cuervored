

/**
 * An array of public routes that can be accessed without authentication
 * @type {Array<{path: string, name: string, component: string}>}
 */
export const publicRoutes = [
    {
        path: "/",
        name: "Home",
        component: "Home",
    },
    
];


/**
 * An array of public routes that are used for authentication
 * These routes can be accessed without authentication
 * @type {Array<{path: string, name: string, component: string}>}
 */
export const authRoutes =[
    {
        path: "/auth/login",
        name: "Login",
        component: "Login",
    },
    {
        path: "/auth/register",
        name: "Register",
        component: "Register",
    },
    {
        path:"/auth/error",
        name:"Error",
        component:"Error"
    }
];





/**
 * The prefix for API routes
 * Routes that start with this prefix will be protected
 * @type {string}
 */
export const apiAuthPrefix ="/api/auth"






/**
 * The default redirect path after logging in
 * 
 * @type {Array<{path: string, name: string, component: string}>}
 */
export const DEFAULT_LOGIN_REDIRECT = [
    {
        path: "/dashboard",
        name: "Dashboard",
        component: "Dashboard",
    }
]