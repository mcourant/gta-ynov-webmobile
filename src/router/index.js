import Vue from 'vue'
import Router from 'vue-router'
import Home from './../components/HomeComponent'
import Login from './../components/LoginComponent'
import Register from './../components/RegisterComponent'
import UserBoard from './../components/UserBoardComponent'
import Admin from './../components/AdminComponent'
import Demande from "./../components/Salarie/DemandeComponent"
import Profil from "./../components/Salarie/ProfilComponent.vue"
import Planning from "./../components/Salarie/PlanningComponent.vue"

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                guest: true
            }
        },
        {
            path: '/dashboard',
            name: 'userboard',
            component: UserBoard,
            meta: {
                requiresAuth: true
            },
            children:[
                {
                    path:"demande-conge",
                    name:"Demande de congé",
                    component: Demande
                },
                {
                    path:"profil",
                    name:"Profil",
                    component: Profil
                },
                {
                    path:"planning",
                    name:"planning",
                    component: Planning
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            meta: {
                requiresAuth: true,
                is_admin : true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if(to.matched.some(record => record.meta.is_admin)) {
                if(user.is_admin == 1){
                    next()
                }
                else{
                    next({ name: 'userboard'})
                }
            }else {
                next()
            }
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(localStorage.getItem('jwt') == null){
            next()
        }
        else{
            next({ name: 'userboard'})
        }
    }else {
        next()
    }
})

export default router