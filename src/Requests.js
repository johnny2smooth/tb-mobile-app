const authenticatedRequest = (url, method, body) => {
    return fetch(`${window._env.URL_API}${url}`, {
        method: method,
        headers: {
            "Authorization": localStorage.getItem("user.token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
        .then(resolve => {
            return resolve.json()})
        .then(json => { return json })

}

export default class APIHelper {

    //Send network request from predefined object of routes
    executeRequest(routes, route, body) {

        let routeInfo = routes[route];

        if (routeInfo) {
            return authenticatedRequest(...routeInfo, body);
        } else {
            throw new Error("Provided route not available.")
        }
    }

    //When you need to use parameters in a request (routes are not always predefined)
    executeRawRequest(route,method,body){
        return authenticatedRequest(route,method,body)
    }
}

