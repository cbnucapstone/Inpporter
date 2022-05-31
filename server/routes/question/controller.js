const Question = require("../../models/question");

//write(작성)
const write = async (req,res)=>{
    console.log(req.body)
    try{
        const question = new Question(req.body);
        await question.save(); //save로 디비에 저장
        console.log("디비에 저장 성공!");
        // console.table([{id:question._id,text:question.text,selected:question.selected}]);
        // res.redirect("/question"); //localhost:3000/question으로 귀한 
    }catch(err){
        console.log("디비 저장 실패");
        res.redirect("/question");
    }
};

//edit(편집)
const edit = (req,res)=>{
    const id = req.params.id; //파라미터로 받은 id를 id에 저장
    Question.find({},null,(err,questions)=>{ //db에서 조회해서
        res.render("QuestionItem",{Questions:questions,idQuestion:id}); //"QuestionItem에 id와 함께 보낸다"

    });
};

//update(수정)
const update = (req,res)=>{
    const id = req.params.id;
    Question.findByIdAndUpdate(id,{text:req.body.text},err => { //해당 id값의 text를 변경
        if(err){
            console.log("수정실패ㅜㅜ");
            console.error(err);
        }
        console.log("수정 성굥!");
        console.log("id:"+id+"\nchanged text:" + req.body.text);
        res.redirect("/question");

    });
};



module.exports ={
    write,
    edit,
    update,
};