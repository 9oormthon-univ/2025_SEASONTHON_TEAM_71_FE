import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatBox = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  min-height: 0;
`;

const OwnerContent = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  margin: 12px auto;
  background-color: #e7eaf6;
  border: 1px solid #142ca6;
  border-radius: 100px;
  width: fit-content;

  @media (max-width: 375px) {
    padding: 6px 12px;
  }

  @media (max-width: 359px) {
    padding: 4px 10px;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  background-color: #fff;
`;

const OwnerInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

const OwnerName = styled.div`
  font-size: 14px;
  color: #111;
`;

const OwnerEngName = styled.div`
  font-size: 12px;
  color: #111;
`;

const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ isUser }) => (isUser ? "flex-end" : "flex-start")};
  margin-bottom: 12px;
`;

const MessageContent = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  flex-direction: ${({ isUser }) => (isUser ? "row-reverse" : "row")};
`;

const Bubble = styled.div`
  background-color: ${({ isUser }) => (isUser ? "#142CA6" : "#E0E0E0")};
  color: ${({ isUser }) => (isUser ? "white" : "black")};
  padding: 10px 14px;
  border-radius: 8px;
  max-width: 70%;
  white-space: pre-wrap;
  font-size: 12px;
  line-height: 1.4;
`;

const Time = styled.span`
  margin-top: 4px;
  font-size: 10px;
  color: #666;
  padding: ${({ isUser }) => (isUser ? "0 4px 0 0" : "0 0 0 4px")};
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #ddd;
  background-color: #fff;
`;

const PlusButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e0e0e0;
  border: none;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  background-color: #e0e0e0;
  border-radius: 100px;
  padding: 0 8px;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: 8px;
  font-size: 12px;
  outline: none;
`;

const SendIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background: none;
  border: none;
  cursor: pointer;
`;

const messagesData = [
  {
    id: 1,
    sender: "user",
    text: "선생님, 자기소개서 쓰다 보니 너무 뻔한 얘기 같아서 고민이에요🥺",
    time: "오후 9:40",
  },
  {
    id: 2,
    sender: "owner",
    text: '네, 지금 문장을 보면 "열심히 했다" 수준에 머물러 있어요.\n그건 기업 입장에서 전혀 설득력이 없습니다.',
    time: "오후 9:41",
  },
  {
    id: 3,
    sender: "owner",
    text: '자소서는 "팩트+성과+배운 점"\n3가지가 동시에 들어가야 해요.\n예를 들어 "팀워크를 발휘했다"는 말은 추상적이죠.',
    time: "오후 9:41",
  },
  {
    id: 4,
    sender: "owner",
    text: '"3명이 진행하던 프로젝트에서 일정 차질로 제가 기획과 자료 조사까지 맡아, 발표 점수 A+를 받았다. 이 과정에서 일정 관리 능력을 배웠다."\n이 정도 구체성은 나와야 기업이 평가합니다',
    time: "오후 9:41",
  },
  { id: 5, sender: "user", text: "감사합니다!!", time: "오후 9:42" },
];

export default function Chat() {
  const [messages, setMessages] = useState(messagesData);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <ChatWrapper>
      <ChatBox ref={chatBoxRef}>
        {/* 컨설턴트 이름 */}
        <OwnerContent>
          <ProfileImage />
          <OwnerInfo>
            <OwnerName>김현아</OwnerName>
            <OwnerEngName>(Hyeonah Kim)</OwnerEngName>
          </OwnerInfo>
        </OwnerContent>

        {messages.map((msg) => (
          <Message key={msg.id} isUser={msg.sender === "user"}>
            <MessageContent isUser={msg.sender === "user"}>
              <Bubble isUser={msg.sender === "user"}>
                {msg.text.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </Bubble>
              <Time isUser={msg.sender === "user"}>{msg.time}</Time>
            </MessageContent>
          </Message>
        ))}
      </ChatBox>

      <InputArea>
        <PlusButton>
          <FaPlus size={10} color="#999" />
        </PlusButton>
        <InputWrapper>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="메시지를 입력하세요"
          />
          <SendIcon onClick={handleSend}>
            <IoIosSend size={18} color="#999" />
          </SendIcon>
        </InputWrapper>
      </InputArea>
    </ChatWrapper>
  );
}
