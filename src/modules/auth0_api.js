var axios = require("axios").default;

async function get_management_api_key(){

    var token = null

    var options = {
        method: 'POST',
        url: 'https://<auth0-url>/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: '',
        client_secret: '',
        audience: ''
        })
    };
    
    await axios.request(options).then(function (response) {
    token = response.data;
    }).catch(function (error) {
        res.status(401).json({'error': true, 'message': 'Cant get token...'})
    });

    // Returns: access_token
    return token;
}

module.exports = {
    get_management_api_key
}