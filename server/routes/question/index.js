const express = require('express');
const question = require('./controller.js');
const questionRouter = express.Router();

//get

//write(질문입력)
questionRouter.post('/write',question.write);

//edit(질문수정)
questionRouter.get('/edit/:id',question.edit);
//update(질문업데이트)
questionRouter.post('/update/:id',question.update);

//remove(질문삭제)
// questionRouter.post('/remove',question.remove);

//questionRouter.delete('/remove/:id',question.remove);

// //Question Router 은정꺼없
// const QuestionRouter=require('./question');

// //Refactoring 은정꺼없
// router.use('/question',QuestionRouter);


module.exports = questionRouter;