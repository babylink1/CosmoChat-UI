
import React, { useEffect, useState } from "react";
import api from "../../api/sessions";
import { Grid, CircularProgress, Typography, Link } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import ActivityStyles from "../../styles/activity";
import AllStyles from "../../styles/all";
import ChatHistory from "../../components/ChatHistory";

const Activity = () => {
  const [loading, setLoading] = useState(false);
  const [sessionDates, setSessionDates] = useState([]);
  const [sessionChatLengths, setSessionChatLengths] = useState([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const response = await api.get("/sessions");
        setSessions(response.data.reverse());
        setSessionDates(Array.from(response.data, (data) => data.date));
        setSessionChatLengths(Array.from(response.data, (data) => data.chats.length));
        setLoading(false);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(err);
        }
      }
    };

    fetchSessions();
  }, []);

  return (
    <Grid container className={ActivityStyles.activityBody}>
      <Grid container item className={ActivityStyles.titleOutline}>
        <Typography className={ActivityStyles.title}>Your Statistics</Typography>
        <Typography className={ActivityStyles.description}>
          Graph of the conversation you had with ...
        </Typography>
      </Grid>

      <Grid container item>
        {loading ? (
          <CircularProgress />
        ) : (
          <BarChart
            data={sessionDates.map((date, index) => ({
              date,
              value: sessionChatLengths[index]
            }))}
            xScaleType="band"
            xField="date"
            yScaleType="linear"
            yField="value"
            width={500}
            height={300}
          />
        )}
      </Grid>

      <Grid container item className={AllStyles.endedChatsTitle}>
        <Grid className={AllStyles.endedChats}>Details Chat Activity</Grid>
        <Link className={AllStyles.seeAllLink} href="/activityDetails">
          See All
        </Link>
      </Grid>

      <Grid container item>
        {loading ? (
          <CircularProgress />
        ) : (
          sessions
            .filter((session) => session.isSessionEnded)
            .slice(0, 4)
            .map((session) => (
              <ChatHistory
                key={session.id}
                date={session.date}
                chats={session.chats}
                isSessionEnded={session.isSessionEnded}
              />
            ))
        )}
      </Grid>
    </Grid>
  );
};

export default Activity;