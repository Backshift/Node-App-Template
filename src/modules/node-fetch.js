

module.exports = {
    fetchjson: async (url, options = {})=>{
        const fetch = require('node-fetch');
        const { readFileAsync } = require('./async_fs');
        const ca = await readFileAsync("certs/siteengine_crt.pem").then((data) => data);
        const https = require('https');
        // Set default options
        const defaultOptions = {
            'headers': new Headers({ 'content-type': 'application/json' }),
            agent: new https.Agent({ ca }),
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any other default headers here
            },
            // Add any other default options here
        };

        // Merge default options with provided options
        const mergedOptions = {
            ...defaultOptions,
            ...options
        };

        // Make the fetch request with merged options
        return fetch(url, mergedOptions);
    }
}