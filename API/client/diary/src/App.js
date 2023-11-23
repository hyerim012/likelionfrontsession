import { useEffect, useState } from "react";
import styled from 'styled-components';
import axios from 'axios';

function App() {
  const [diaryList, setDiaryList] = useState(null);
  const [selectedMood, setSelectedMood] = useState([]);

  const fetchDiary = async () => {
    const res = await axios.get("http://localhost:4000/api/diary");
    setDiaryList(res.data);
  }

  useEffect(() => {
    fetchDiary();
  }, []);

  const handleMoodChange = (e) => {
    const moodValue = e.target.value;
    if (selectedMood.includes(moodValue)) {
      setSelectedMood(selectedMood.filter((mood) => mood !== moodValue));
    } else {
      setSelectedMood([...selectedMood, moodValue]);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;

    if (selectedMood.length !== 1) {
      alert("기분을 하나만 선택해주세요!");
      return;
    }

    await axios.post("http://localhost:4000/api/diary", {
      title,
      content,
      mood: selectedMood[0],
    });
    fetchDiary();
  };

  return (
    <>
      <Container>
        <Title>일기를 써봅시다!</Title>
        <Form onSubmit={onSubmitHandler}>
          <Input name="title" placeholder="제목" />
          <TextArea name="content" placeholder="내용" />
          <MoodContainer>
            <MoodCheckbox
              value="신남"
              onChange={handleMoodChange}
              checked={selectedMood.includes("신남")}
            />
            <MoodCheckbox
              value="좋음"
              onChange={handleMoodChange}
              checked={selectedMood.includes("좋음")}
            />
            <MoodCheckbox
              value="보통"
              onChange={handleMoodChange}
              checked={selectedMood.includes("보통")}
            />
            <MoodCheckbox
              value="나쁨"
              onChange={handleMoodChange}
              checked={selectedMood.includes("나쁨")}
            />
            <MoodCheckbox
              value="화남"
              onChange={handleMoodChange}
              checked={selectedMood.includes("화남")}
            />
          </MoodContainer>
          <SubmitButton type="submit">추가</SubmitButton>
        </Form>
        {diaryList && (
          <DiaryList>
            {diaryList.map((diary) => (
              <DiaryItem key={diary.id}>
                <div>
                  <DiaryTitle>{diary.title}</DiaryTitle>
                  <DiaryContent>{diary.content}</DiaryContent>
                  <DiaryDate>{diary.date}</DiaryDate>
                  <DiaryMood>{diary.mood}</DiaryMood>
                </div>
              </DiaryItem>
            ))}
          </DiaryList>
        )}
        <Alert>그만 줄여요!</Alert>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
`;

const MoodContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

const MoodCheckbox = styled.input.attrs({type: 'checkbox'})`
  margin-right: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  width: 50%;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

const DiaryList = styled.ul`
  list-style: none;
  width: 60%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
`;

const DiaryItem = styled.li`
  border-bottom: 1px solid #eee;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DiaryTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const DiaryContent = styled.p`
  font-size: 16px;
  color: #555;
`;

const DiaryDate = styled.p`
  font-size: 14px;
  color: #777;
`;

const DiaryMood = styled.p`
  font-size: 14px;
  color: #555;
`;

const Alert = styled.p`
  font-size: 40px;
  font-weight: bold;
  color: red;
  display: none;
  @media only screen and (max-width: 350px) {
    display: flex;
  }
`;
