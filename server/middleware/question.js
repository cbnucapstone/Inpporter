const Question = require("../models/question");

let question = (req, res, next) => {
    Question.find(function(err,data){
        try{
            if (!data) return res.json({error:true});
            res.json({list:data});
            next();
        }catch(err){
            console.log('err');
            throw err;
        }
    });
};

module.exports = question;