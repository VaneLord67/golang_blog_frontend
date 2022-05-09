import VueRouter from 'vue-router'

const HomePage = () => import('../components/Home/HomePage.vue')
const Login = () => import('../components/User/Login.vue')
const Register = () => import('../components/User/Register')
const Article = () => import('../components/article/Article')
const UserHome = () => import('../components/User/UserHome')
const ArticleHome = () => import('../components/article/ArticleHome')
const Create = () => import('../components/article/Create')

//创建并暴露一个路由器
const router = new VueRouter({
	mode: "history",
	routes: [
		{
			name: 'homePage',
			path: '/',
			component: HomePage,
		},
		{
			name: 'login',
			path: '/login',
			component: Login,
		},
		{
			name: 'register',
			path: '/register',
			component: Register,
		},
		{
			name: 'article',
			path: '/article',
			component: Article,
		},
		{
			name: 'userHomePage',
			path: '/user/home',
			component: UserHome,
		},
		{
			name: 'ArticleHome',
			path: '/article/home',
			component: ArticleHome,
		},
		{
			name: 'CreateArticle',
			path: '/article/create',
			component: Create,
		},
	]
})


// 下面这段防止跳转重复路由时报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default router;