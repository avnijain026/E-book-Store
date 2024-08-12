import About from "../container/about/About";
import Department from "../container/admin/department/Department";
import Product from "../container/admin/product/Product";
import University from "../container/admin/university/University";
import Contact from "../container/contact/Contact";
import Login from "../container/login/Login";
import Register from "../container/register/Register";
import Support from "../container/support/Support";
import UserDepartment from "../container/user/department/UserDepartment";
import Home from "../container/user/home/Home";
import UserProduct from "../container/user/product/UserProduct";
import ProductDetail from "../container/user/productDetail/ProductDetail";

const ROUTES={
    HOME:'/',
    about:{
        name:"/about",
        component:<About/>,
    },
    contact:{
        name:"/contact",
        component:<Contact/>,
    },
    support:{
        name:"/support",
        component:<Support/>,
    },
    register:{
        name:"/register",
        component:<Register/>,
    },
    login:{
        name:"/login",
        component:<Login/>,
    },
    universityAdmin:{
        name:"/universityAdmin",
        component:<University/>,
    },
    departmentAdmin:{
        name:"/departmentAdmin",
        component:<Department/>,
    },
    productAdmin:{
        name:"/productAdmin",
        component:<Product/>,
    },
    home:{
        name:"/",
        component:<Home/>,
    },
    department:{
        name:"/department",
        component:<UserDepartment/>,
    },
    product:{
        name:"/product",
        component:<UserProduct/>,
    },
    productDetails:{
        name:"/productDetails",
        component:<ProductDetail/>,
    },
}

export default ROUTES;