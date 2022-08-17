const Question = require("../../models/question");

//read(읽기)
const get = (req, res, next) => {
    Question.find({userid:req.params.userid},function(err,data){
        try{
            if (!data) return res.json({error:true});
            res.json({list:data});
            next();
        }catch(err){
            console.error(err);  
            throw err;
        }
    });
    console.log("되고있낭ㅇㅇ")
};

const getSelected = (req, res, next) =>{
    console.log("백단 카테고리 들어옴")
    console.log(req.params.selected)
    Question.find({userid:req.params.userid, selected : req.params.selected}, 
        function(err, data){
            try{
                if (!data) return res.json({error:true});
                res.json({list:data});
                next();
            }catch(err){
                console.error(err);  
                throw err;
            }

    });
    console.log("카테고리별로 띄우기 성공")

};
 
//write(작성)
const write = async (req,res)=>{
    console.log(req.body)
    try{
        const question = new Question(req.body);
        await question.save(); //save로 디비에 저장
        console.log("디비에 저장 성공!");
    }catch(err){
        console.log("디비 저장 실패");
        res.redirect("/question");
    }
};

//edit(편집)
const edit = (req,res)=>{
    console.log("백단 에딧 들어옴")
    const updateQ = Question.findById(req.params.id,(err,data)=>{ //db에서 조회해서
        if(err){
            console.log("수정할 질문 ID 찾기 실패");
            console.error(err);            
        }else{
            res.json(data)
            console.log("수정할 ID 찾기 성공")         
        }
        
    });
};

//update(수정) 
const update = async (req,res) => {
    console.log("백단업뎃들어옴");
    console.log(req.body);
    console.log(req.body.id);
    try{
        const _id = req.body.id;
        const text = req.body.text;
        await Question.findByIdAndUpdate({_id},{$set:{_id, text}});
    } catch(err){
        console.log("실패패패퍂")
    }
};

//삭제
const Delete = (req, res) => {
    Question.findByIdAndRemove({ _id : req.params.id }, (err)=> {
        if(err){
            console.log("ㅈ됨")
        }
        console.log("삭제 성공!")
        res.status(204).end();
    });
};

module.exports ={
    get,
    getSelected,
    write,
    edit,
    update,
    Delete
};