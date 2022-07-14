const express = require('express');
const question = require('./controller.js');
const questionRouter = express.Router();

//read(DB 읽어오기)
questionRouter.get('/', question.get);

//write(질문입력)
questionRouter.post('/write', question.write);

//edit(질문수정)
questionRouter.get('/edit/:id',question.edit);

//update(질문업데이트)
questionRouter.post('/update/:id', question.update);

//remove(질문삭제)
questionRouter.post('/delete/:id', question.Delete);

module.exports = questionRouter;