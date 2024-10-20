const postgres = require('postgres')
const { Validator } = require('jsonschema');
const fs = require('fs')

const schema = {
  type: 'object',
  properties: {
    property1: { type: 'string' },
  },
  required: ['property1']
};
const validator = new Validator();
module.exports = {
    /**
     * Validation test
     *
     * @param {string} property1 ...
     * @return {object} ...
     */
    test_method: async (req,res)=>{
        try {
          const jsonData = req.body;
          // Validate JSON against schema
          const validationResult = validator.validate(jsonData, schema);
          console.log(validationResult)
          if (!validationResult.valid) {
            return res.status(400).json({ error: 'Validation failed', details: validationResult.errors });
          }
        } catch(e){
            console.log(e)
            res.json({"Error": "Database could not fullfill the request"})
        } finally {
            if(res.headersSent){
                return
            }
            return res.json({"sucess": true})
        }

    }
}