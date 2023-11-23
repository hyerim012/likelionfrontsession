const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

let id = 2;

const diaryList = [
  {
    id: 1,
    title: "오늘은 리액트 세션~",
    content: "리액트는 왜 이렇게 재밌을까?",
    date: "2023-11-22",
    mood: "신남", 
  },
];

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/api/diary', function (req, res) {
  res.json(diaryList);
});

app.post('/api/diary', (req, res) => {
  const { title, content, mood } = req.body;
  const date = new Date().toISOString().slice(0, 10);

  diaryList.push({
    id: id++,
    title,
    content,
    date,
    mood,
  });

  return res.json(diaryList);
});

app.listen(4000, () => {
  console.log("server start!");
});

