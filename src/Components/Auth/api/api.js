async function apiRequest(endpoint, method, body, token) {
    try {
        console.log('Token:',  token);
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + endpoint, {
            method: method,
            headers: {
                'Authorization': token ? 'Bearer ' + token : undefined,
                'Content-Type': 'application/json',
                'api-key': process.env.REACT_APP_API_KEY
            },
            body: method === 'GET' ? undefined : JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}
export default apiRequest;