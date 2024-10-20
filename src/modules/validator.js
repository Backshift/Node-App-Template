// https://github.com/validatorjs/validator.js
const validator = require('validator');
const v = validator

module.exports = {
    v: validator,
    options: [],
    errors: [],
    passed: false,
    pass_arr: [],
    err_msgs: {
        'property1': 'Length should be greater than 1',
    },
    setoptions(options){},
    runvalidator(options, body){
        this.clearValidator();
        this.options = options;
        var passed = false;
        var breakonmissing = false

        for(var i = 0; i < options.length; i++){

            const name = options[i]['name'];

            if(body == '' || typeof body == "string"){
                return this;
            }

            // Sanitize inputs
            if(options[i].sanitize){
                if(name in body && body[name] != undefined){
                    body[name] = v.escape(body[name]);
                }
            }

            // Custom
            if('custom' in options[i]){
                this.handleValidation(options[i], 'custom')
                continue
            }

            
            var method = options[i]['validate']['name'];
            var errmsg = "";

            if(name in body){
                this.handleValidation(options[i], body)
            } else {
                this.pass_arr.push(false);
                this.errors.push({"error": "Missing in form", "name": name})
                if(breakonmissing){
                    break;
                }
            }

        }

        if(!this.pass_arr.includes(false)) this.passed = true;
        return this;
    },
    handleValidation(option, body=false){
        const name = option['name'];
        var custom_fn;
        var errmsg_name = option['err'] || false;
        var options;

        //  Check validation
        if(errmsg_name){
            errmsg = this.err_msgs[errmsg_name] || ""
        }

        if(body == 'custom'){
            // Custom function should return a bool
            custom_fn = option['custom']
            this.pass_arr.push(custom_fn);
            return;
        } else {
            custom_fn = body[name]
            options = option['validate']['options'] ? option['validate']['options'] : {};
        }

        // Run validation check
        if(v[option['validate']['name']](custom_fn, options)){
            this.pass_arr.push(true);
        } else {
            this.errors.push({"error": errmsg, "name": name})
            this.pass_arr.push(false);
        }

    },
    clearValidator(){
        this.errors = [];
        this.passed = false;
        this.pass_arr = [];
    },
    escape(body){
        if(typeof body == Object){
            for(var b in body){
                body[b] = v.escape(body)
            } 
        } else {
            return v.escape(body)
        }
    }
}

v.isDateTime = function(d){
    var date = new Date(d);
    return date instanceof Date && !isNaN(date.valueOf());
}

v.csrf = function(d, options){
    var Tokens = require('csrf');
    var tokens = Tokens();
    var secret =  options.session.secret;
    var token = d;

    if (!tokens.verify(secret, token)) {
        console.log('Token is invalid');
        return false
    } else {
        return true;
    }
}