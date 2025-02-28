async function apiRequest(endpoint, method, body, token) {
    console.log("api: "+process.env.REACT_APP_API_BASE_URL + endpoint);
    console.log("body: "+body);
    console.log("body json: "+JSON.stringify(body));
    try {
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + endpoint, {
            method: method,
            headers: {
                'Authorization': token ? 'Bearer ' + token : undefined,
                'Content-Type': 'application/json',
                'api-key': process.env.REACT_APP_API_KEY
            },
            body: method === 'GET' ? undefined : JSON.stringify(body)
        });
        console.log(response);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
export default apiRequest;