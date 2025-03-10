

const baseURL = window._env ? window._env.URL_API : "";

const rawAuthenticatedRequest = (url, method, body, options) => {

    let requestOptions = {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    }

    if (method && method != "GET") {
        requestOptions.body = JSON.stringify(body)
    }

    return new Promise((resolve, reject) => {
        fetch(`${baseURL}${url}`, requestOptions).then(res => {

            if (!res.ok) {
                reject(res)
            }

            resolve(res.json());
        }).catch(error => {
            reject(error)
        })
    })
}

const authenticatedRequest = (url, method, body, options) => {
    let requestStatus = 0;

    let requestOptions = {
        method: method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    }

    if (method && method != "GET") {
        requestOptions.body = JSON.stringify(body)
    }

    return fetch(`${baseURL}${url}`, requestOptions)
        .then(resolve => {
            requestStatus = resolve.status;
            return resolve.json()
        })
        .then(json => {
            if (options && options.includeStatus) json.httpStatus = requestStatus;
            return json
        }).catch(error => {
            throw new Error(error)
            // console.log('Error with request. JSON body likely not valid ')
        })
}

export default class APIHelper {

    constructor(uiStore) {
        this.uiStore = uiStore;
    }

    checkAuth(response) {
        if (response && (response.status === 401) && !response.isLogin) {
            this.uiStore.setAuthError();
        }
    }

    //Send network request from predefined object of routes
    executeRequest(routes, route, body, options) {

        let routeInfo = routes[route];

        if (routeInfo) {
            return authenticatedRequest(...routeInfo, body, options);
        } else {
            throw new Error("Provided route not available.")
        }
    }

    //When you need to use parameters in a request (routes are not always predefined)
    executeRawRequest(route, method, body, options) {
        return authenticatedRequest(route, method, body, options)
    }

    request(route, method, body, options) {
        return rawAuthenticatedRequest(route, method, body, options)
    }
}

