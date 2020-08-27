import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/start'
import Steps from "@/views/steps"
import Words from '@/views/steps/words'
import Finish from "@/views/finish"

Vue.use(VueRouter)

const routes = [{
        path: "/",
        name: "Start",
        component: Start,
    },
    {
        path: "/questions",
        name: "Steps",
        component: Steps,
    },
    {
        path: "/questions/words",
        name: "Words",
        component: Words,
    },
    {
        path: "/finish",
        name: "Finish",
        component: Finish
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router