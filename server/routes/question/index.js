const express = require('express');
const question = require('./controller.js');
const questionRouter = express.Router();

//get(DB 읽어오기)
questionRouter.get('/:userid', question.get);

//get(특정 selected 값으로 데이터 조회)
questionRouter.get('/:userid/:selected',question.getSelected);

//write(질문입력)
questionRouter.post('/write', question.write);

//update(질문업데이트)
questionRouter.post('/update/:id', question.update);

//remove(질문삭제)
questionRouter.post('/delete/:id', question.Delete);

module.exports = questionRouter;