

/**
 * An array of public routes that can be accessed without authentication
 * @type {Array<{path: string, name: string, component: string}>}
 */
export const publicRoutes = [
    {
        path: "",
        name: "",
        component: "",
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
 * @type {Array<{path: string, name: string, component: string}>}
 */
export const apiAuthPrefix =[
    {
        path: "/api/auth",
        name: "ApiAuth",
        component: "ApiAuth",
    },
    

    {
        path: "/api/user/[id]",
        name: "ApiUser",
        component: "ApiUser",
    },
    {
        path: "/api/user",
        name: "ApiUserAll",
        component: "ApiUserAll",
    },
    {
        path: "/api/posts",
        name: "ApiPostsAll",
        component: "ApiPostsAll",
    },
    {
        path: "/api/posts/[postId]/likes",
        name: "ApiPostLikes",
        component: "ApiPostLikes",
    },
    {
        path: "/api/sanlorenzo",
        name: "ApiCASLA",
        component: "ApiCASLA",
    }
]






/**
 * The default redirect path after logging in
 * 
 * @type {Array<{path: string, name: string, component: string}>}
 */
export const DEFAULT_LOGIN_REDIRECT = [
    {
        path: "/",
        name: "Home",
        component: "Home",
    }
]