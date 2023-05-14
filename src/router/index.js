import {createRouter, createWebHistory} from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth"

const router = createRouter({
    history : createWebHistory(),
    routes:[
        { path: "/", component: () => import("../views/home.vue") },
        { path: "/Clicker", component: () => import("../views/clicker.vue") },
        { path: "/sign-in", component: () => import("../views/Singin.vue") },
        { path: "/register", component: () => import("../views/Register.vue") },
        
        
        { path: "/coleccion", 
        component: () => import("../views/coleccion.vue"),
            meta: {requiresAuth: true,
            },
        
        },
        
        
        { path: "/add", component: () => import("../views/addHeroe.vue"), 
            meta: {requiresAuth: true,
            },
        },
        
        
        { path: "/list", component: () => import("../views/listHeroe.vue"),
            meta: {requiresAuth: true,
            },
        },
    ],
});
const getCurrentUser = () =>
{
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject

        );


    });

};

router.beforeEach(async (to, from, next) =>
{
    if(to.matched.some((record) => record.meta.requiresAuth))
    {
        if(await getCurrentUser())
        {
            next();
        }else
        {
            alert("You dont have access!!");
            next("/");
        }

    }else{
        next();
    }

});
export default router;