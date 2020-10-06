import Vue from "vue"
import VueRouter from "vue-router"
import Start from "@/views/start"
import Validate from "@/views/validate"
import Intro from "@/views/intro"
import Finished from "@/views/finished"
import Questions from "@/views/questions"

Vue.use(VueRouter)


function checkAuth (to, from, next) {
    if (!localStorage.getItem('_user')) {
      next({
        path: '/'
      })
    } else {
      next()
    }
}

const routes = [{
        path: "/",
        name: "Start",
        component: Start,
        meta: {
            'background': 'home'
        }
    },
    {
        path: "/validate",
        name: "Validate",
        component: Validate,
        meta: {
            'background': 'home'
        }
    },
    {
        path: "/intro",
        name: "Intro",
        component: Intro,
        meta: {
            'background': 'home'
        },
        beforeEnter: checkAuth
    },
    {
        path: "/questions",
        name: "Question",
        component: Question,
        meta: {
            'background': 'question'
        },
        beforeEnter: checkAuth
    }
    {
        path: "/finished",
        name: "Finished",
        component: Finished,
        beforeEnter: checkAuth
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router