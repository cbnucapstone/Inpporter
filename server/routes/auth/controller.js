const User = require("../../models/user");

const register = (req,res)=>{
    console.log(req.body);
    const user = new User(req.body);

    user.save((err,userInfo)=>{
        if (err) return res.status(200).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
};

const login = (req,res)=>{
    console.log(req.body);
    User.findOne({id:req.body.id},(err,user)=>{ //DB에서 일치하는 id찾기
        if(user==null){ // user가 존재하지 않으면 일치하는 id가 없는것
            console.log("id not find");
            return res.json({
                success:false,
                msg:"id not find",
            });
        }else{
            console.log("id correct");
            // 비밀번호 비교
            user.comparePassword(req.body.pw)
            .then((isMatch)=>{
                if(!isMatch){ // id는 일치, pw 불일치
                    console.log("id find but pw not correct")
                    return res.json({
                        success:false,
                        msg:"pw not correct",
                    });
                }
                console.log("login success")
                
                // 비밀번호까지 일치한다면, jwt 토큰 생성 메소드 생성
                user
                .generateToken()
                .then((user)=>{
                    // 토큰을 쿠키, localStorage에 저장
                    res
                    .cookie("x_auth",user.token)
                    .status(200)
                    .json({success:true,userId:user._id});
                })
                .catch((err)=>{
                    res.status(400).send(err);
                });
            })
            .catch((err)=>res.json({loginSuccess:false,err}));
        }
    })
};

// auth 미들웨어 지난 후 req.user에서 user정보 받아오는 코드
const auth = (req,res)=>{
    res.status(200).json({
        _id:req._id,
        isAuth:true,
        id:req.user.id,
        name:req.user.name,
        nickname:req.user.nickname,
        email:req.user.email,
        phone:req.user.phone
    });
};

const logout = (req,res) =>{
    User.findOneAndUpdate({_id:req.user._id},{token:""},(err,user)=>{
        if(err) return res.json({success:false,err});
        res.clearCookie("x_auth");
        return res.status(200).send({
            success:true,
        });
    });
};

module.exports ={
    register,
    login,
    auth,
    logout
};
