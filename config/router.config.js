export default [
    // user
    {
        path: "/user",
        component: "../layouts/userLayout",
        routes: [
            { path: "/user", redirect: "/user/login" },
            { path: "/user/login", component: "./user/login" }
        ]
    },
    // app
    {
        path: "/",
        component: "../layouts/basicLayout",
        Routes: ["src/pages/authorized"],
        authority: ["admin", "user"],
        routes: [
            // dashboard
            { path: "/", redirect: "/dashboard/analysis" },
            {
                path: "/dashboard",
                name: "dashboard",
                icon: "dashboard",
                routes: [
                    {
                        path: "/dashboard/analysis",
                        name: "analysis",
                        component: "./dashboard/analysis"
                    }
                ]
            },
            {
                path: "/order",
                routes: [
                    { path: "/order/detail", component: "/order/detail" }
                ]
            }
        ]
    }
];
