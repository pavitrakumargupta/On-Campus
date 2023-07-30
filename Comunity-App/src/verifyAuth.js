const UseVerifyAuth = () => {
    const userHistory = JSON.parse(localStorage.getItem("CollegeDesk"));
    if (userHistory !== null && ( window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/forgot-password') ) {
        return userHistory;
    } else if (userHistory === null&& (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/forgot-password')) {
        localStorage.setItem("lastUrl", JSON.stringify(window.location.pathname)); 
        window.location.href = "/login";
    }
    else return true
};



export default UseVerifyAuth;
