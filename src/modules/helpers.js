module.exports = {
    padzeros: function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        var padded_str =  n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
        return padded_str.substr(padded_str.length-width); 
    },
    snakecase: function(txt){
        return txt.match(
            /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
            .map(s => s.toLowerCase())
            .join('_');
    },
    randomstring: function(keyLength) {
        var i, key = "", characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var charactersLength = characters.length;
        for (i = 0; i < keyLength; i++) {
            key += characters.substr(Math.floor((Math.random() * charactersLength) + 1), 1);
        }
        return key;
    },
    objToQueryStr: function(obj){
        if(obj.constructor.name == 'Array'){
            var str = '';
            for(var i = 0; i < obj.length; i++){
                var keys = Object.keys(obj[i])
                var c = obj[i]
                for(var k = 0; k < keys.length; k++){
                    var z = obj[i][k];
                    var p = '&'
                    if(i == 0 && k == 0){
                        p = ''
                    }
                    str+=`${p}${keys[k]}_${i}=${encodeURIComponent(obj[i][keys[k]])}`
                }
            }
            return str
        }
        else{
            const entries = Object.values(obj)
            const trueObj = {}
            for (let i = 0; i < entries.length; i += 2) {
            trueObj[entries[i]] = entries[i + 1]
            }
            const params = new URLSearchParams(obj[0])
            const queryString = params.toString()
            return queryString
        }

    },
    queryStrToObj: function(qs){
		var s = qs.split('&');
		var ar = [];
		for(var i = 0; i < s.length; i++){
			var m = s[i].match(/(^.*_\d)(.*)/);
			m[1] = m[1].match(/(^.*_)(\d)/)
			m[1][1] = m[1][1].substr(0, m[1][1].length-1)
			m[2] = m[2].substr(1, m[2].length)
			var index = Number(m[1][2])
			var objname = m[1][1]
			if(typeof ar[index] != 'object') ar[index] = new Object();
			ar[index][objname] = decodeURIComponent(m[2]);
		}
    	return ar
    },
    emptyvar: function(val){
        if(val == undefined || val == null || val == 'undefined' || val == false || val == 'None'){
            return true;
        } else {
            return false;
        }
    },
    ASCIIListToHex: function(inputText){
        // Split the input text into lines
        const lines = inputText.split('\n');
        // Initialize an empty array to store the HEX lines
        const hexLines = [];
        // Iterate through each line and convert to HEX
        for (const line of lines) {
            let hexLine = '';
            for (let i = 0; i < line.length; i++) {
            // Get the ASCII code of each character and convert to HEX
            const hexChar = line.charCodeAt(i).toString(16).toUpperCase();
            // Ensure that each HEX character is two digits
            hexLine += hexChar.padStart(2, '0');
            }
            // Add the HEX line to the result array
            hexLines.push(hexLine);
        }
        // Join the HEX lines with newline characters and return the result
        return hexLines.join(',');
    },
    hexListToASCII: function(hexText){
        // Split the input text into lines
        const lines = hexText.split('\n');
        // Initialize an empty array to store the ASCII lines
        const asciiLines = [];
        // Iterate through each line and convert to ASCII
        for (const line of lines) {
            let asciiLine = '';
            // Split the HEX line into two-character segments
            const hexSegments = line.match(/.{1,2}/g);
            if (hexSegments) {
            for (const hexSegment of hexSegments) {
                // Convert each HEX segment to decimal and then to ASCII
                const asciiChar = String.fromCharCode(parseInt(hexSegment, 16));
                asciiLine += asciiChar;
            }
            }
            // Add the ASCII line to the result array
            asciiLines.push(asciiLine);
        }
        // Join the ASCII lines with newline characters and return the result
        return asciiLines.join('\n');
    },
    parseCoords: function(body, beaconcoords){
        var coord_arr = [];
        if(!"coordinates" in body || body["coordinates"] == undefined || body["coordinates"] == '' || body["coordinates"] == null){
            coord_arr[0] = beaconcoords['latitude'];
            coord_arr[1] = beaconcoords['longitude'];
        } else{
            coord_arr = body["coordinates"].split(',');
            coord_arr[0] = coord_arr[0].trim();
            coord_arr[1] = coord_arr[1].trim();
        }
        return coord_arr;
    },
    toBool: function(b){
        if(b == "True" || b == "true" || b == true || b == 1 || b == "1"){
            return true;
        } else if (b == "False" || b == "false" || b == false || b == 0 || b == "0"){
            return false;
        }
        return null;
    }
    
}