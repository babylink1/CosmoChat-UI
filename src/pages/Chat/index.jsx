import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Textarea from "@mui/joy/Textarea"; // 这个路径是不正确的，需要根据你的实际安装路径进行调整
import Images from ""; // 你需要正确引入你的 Images
import ChatStyles from ""; // 你需要正确引入 ChatStyles
import api from "../../api/sessions"; // 你需要正确引入 api 模块
import OpenAI from "openai";
import { useParams } from "react-router-dom";
import UserMessage from ""; // 你需要正确引入 UserMessage
import RexMessage from ""; // 你需要正确引入 RexMessage
import useMediaQuery from "@mui/material/useMediaQuery";

const Chat = () => {
  const { id } = useParams();
  const [userPrompt, setUserPrompt] = useState("");
  const [rexReply, setRexReply] = useState("");
  const [sessions, setSessions] = useState([]);
  const [ThisSessions, setThisSessions] = useState(null);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
  const matches = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get("/sessions");
        console.log("Fetch sessions response:", response.data); // 日志API响应
        setSessions(response.data);
        const foundSession = response.data.find(
          (session) => parseInt(session.id, 10) === parseInt(id, 10)
        );
        console.log("Found session:", foundSession); // 日志找到的会话
        setThisSessions(foundSession);
        handleScroll();
        handleSubmit();
        window.addEventListener("scroll", handleScroll);
        // 不确定你意图在这里添加 window.addEventListener("submit")
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions(); // 将 fetchSessions() 移至 useEffect 内部
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    console.log("Scroll position:", scrollPosition);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedSession = {};
    setTimeout(async () => {
      const date = new Date();
      const formattedDate = `${
        months[date.getMonth()]
      } ${date.getDate()}.${date.getFullYear()}`;
      await callOpenAIAPI();
      ThisSessions.chats.push({
        user: userPrompt,
        ReX: rexReply,
      });
      updatedSession = {
        id: id,
        date: formattedDate,
        chats: ThisSessions.isSessionEnded,
      };

      try {
        const response = await api.patch(`sessions/${id}/`, updatedSession); // 修正了 api.patch 的语法
        console.log("Patch session response:", response.data); // 日志 patch session 的响应
        setSessions(
          sessions.map((session) =>
            session.id === id ? response.data : session
          )
        );
        setUserPrompt("");
      } catch (error) {
        console.error(`Error patching session: ${error.message}`);
      }
    }, 5000);
  };

  async function callOpenAIAPI() {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Your name is Rex. You are a career advice assistant. You give advice to Andrew about his career",
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
    });
    console.log("OpenAI completion:", completion.choices[0].message.content); // 日志 OpenAI 响应
    setRexReply(completion.choices[0].message.content);
  }

  console.log("ThisSessions:", ThisSessions); // 日志 ThisSessions 查看其值

  return (
    <Grid container style={{ display: matches ? "none" : "block" }}>
      <Grid style={{ padding: "40px 24px 24px 24px", position: "sticky" }}>
        <img src={Images.HomRex} alt="Rex" style={{ width: "105px" }} />
      </Grid>
      <Grid {...ChatStyles.textDisplayBackground}>
        {ThisSessions?.chats?.map((chat, i) =>
          Object.keys(chat).map((key) =>
            key === "ReX" ? (
              <RexMessage rexMessage={chat.ReX} key={"rex" + i} />
            ) : (
              <UserMessage userMessage={chat.user} key={"user" + i} />
            )
          )
        )}
      </Grid>
      {ThisSessions && !ThisSessions.isSessionEnded ? (
        <Grid>
          <Textarea
            {...ChatStyles.textArea}
            name="Soft"
            placeholder="Soft"
            variant="soft"
            onChange={(e) => setUserPrompt(e.target.value)}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default Chat;
