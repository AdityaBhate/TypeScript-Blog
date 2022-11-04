import IRoute from "../interfaces/route";
import BlogPage from "../pages/blog";
import EditPage from "../pages/edit";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";

const authRoute: IRoute[] = [
	{
		path: "/login",
		component: LoginPage,
		name: "Login",
		auth: false,
	},
	{
		path: "/login",
		component: LoginPage,
		name: "Register",
		auth: false,
	},
];
const blogRoutes: IRoute[] = [
	{
		path: "/edit",
		component: EditPage,
		name: "Edit",
		auth: true,
	},
	{
		path: "/edit/:blogID    ",
		component: EditPage,
		name: "Edit",
		auth: true,
	},
	{
		path: "/blogs/:blogID",
		component: BlogPage,
		name: "Blog",
		auth: false,
	},
];
const mainRoutes: IRoute[] = [
	{
		path: "/",
		component: HomePage,
		name: "Home",
		auth: false,
	},
];

const routes: IRoute[] = [...authRoute, ...blogRoutes, ...mainRoutes];

export default routes;
