const fs = require('fs')
var axios = require("axios").default;
var { get_management_api_key } = require('../modules/auth0_api');

module.exports = function RoleMiddleware(allow_roles) {
    return async (req, res, next) => {
        const uid = `${req.oidc.user.sub}`
        var token = await get_management_api_key();
        var options = {
        method: 'GET',
        url: `https://<auth0-url>/api/v2/users/${uid}/roles`,
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token.access_token}`
        }
        };
        axios.request(options).then(function (response) {
            var userhasrole = false;
            req.roles = response.data;
            for(var role in req.roles){
                if(allow_roles.includes(req.roles[role]['name'])){
                    userhasrole = true;
                }
            }
            if(userhasrole){
                next();
            } else {
                res.status(401).send('Unauthorized')
            }
        }).catch(function (error) {
            console.error(error);
            res.status(401).send('Unauthorized')
        });
    }
}