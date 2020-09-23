import Vue from "vue"
import VueRouter from "vue-router"
import Start from "@/views/start"
import Validate from "@/views/validate"
import Intro from "@/views/intro"
import Finish from "@/views/finish"
import Question from "@/views/question"
import Words from "@/views/steps/words"
import Puzzle from '@/views/steps/puzzle'

Vue.use(VueRouter)

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
        }
    },
    {
        path: "/questions",
        name: "Question",
        component: Question,
        meta: {
            'background': 'question'
        }
    },
    {
        path: "/questions/words",
        name: "Words",
        component: Words,
        meta: {
            'background': 'question'
        }
    },
    {
        path: "/questions/puzzle",
        name: "Puzzle",
        component: Puzzle,
        meta: {
            'background': 'question'
        }
    },
    {
        path: "/finish",
        name: "Finish",
        component: Finish
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router