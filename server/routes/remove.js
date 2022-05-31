const Question = require("../models/question");

const remove = (req,res)=>{
    const id = req.body.data;
    Question.findByIdAndRemove(id,err => {
        if(err){
            console.log("삭제실패ㅜㅜ");
            console.error(err)
            return res.json({delete:false});
        }
        console.log("삭제 성굥!!");
        console.log("id:" + id);
         res.redirect("/question");
        return res.json({delete:true});

    });
};


module.exports = {remove}