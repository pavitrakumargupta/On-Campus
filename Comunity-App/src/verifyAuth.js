const UseVerifyAuth = () => {
    const userHistory = JSON.parse(localStorage.getItem("On-Campus"));
    if (userHistory !== null && ( window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/forgot-password') ) {
        return userHistory;
        
    } else if (userHistory === null&& (window.location.pathname !== '/' && window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/forgot-password')) {
        window.location.href = "/login";
    }
    else return true
};



export default UseVerifyAuth;
