import Vue from "vue"
import VueRouter from "vue-router"
import Start from "@/views/start"
import Validate from "@/views/validate"
import Steps from "@/views/steps"
import Finish from "@/views/finish"
import Words from "@/views/steps/words"
import Puzzle from '@/views/steps/puzzle'

Vue.use(VueRouter)

const routes = [{
    path: "/",
    name: "Start",
    component: Start,
},
{
    path: "/validate",
    name: "Validate",
    component: Validate
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
    path: "/questions/puzzle",
    name: "Puzzle",
    component: Puzzle,
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