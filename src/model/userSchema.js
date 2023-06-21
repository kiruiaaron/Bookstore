const joi= require('joi');

const new_user_schema = joi.object({
    name:joi.string()
             .min(3)
             .required(),

    Address:joi.string()
                .required()
                .min(5)
                .max(30),
        
    ContactNumber: joi.number()
                      .integer()
                      .required()
                      .max(10)
                      .min(10),
     
    Email:joi.string()
           .required()
           .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
    Password:joi.string()
               .required()
               .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

module.exports ={new_user_schema};