import { SessionProvider } from "next-auth/react"
import '../styles/globals.css';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import axios from "axios";
import { useDaysLeftStore } from "@/stores/useDaysLeftStore";
import { useUserColorStore } from "@/stores/useUserColorStore";
import { useEffect } from "react";

TimeAgo.addLocale(en)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const setDaysLeft = useDaysLeftStore((state) => state.setDaysLeft);
  const setUserColor = useUserColorStore((state) => state.setUserColor);
  const setUserName = useUserColorStore((state) => state.setUserName);

  async function getDaysLeft() {
    await axios.get('/api/dumps').then(response => {
      const timestampLastDump = response.data[0].createdAt
      const deadline = new Date(timestampLastDump)
      deadline.setDate(deadline.getDate() + 14)
      const today = new Date();
      if (deadline > today) {
        const deadlineTime = deadline.getTime();
        const todayTime = today.getTime();
        const difference = deadlineTime - todayTime;
        const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
        setDaysLeft(daysLeft);
      } else {
        setDaysLeft(0);
        axios.delete('/api/dumps');
        // setTimeout(() => {
          getDaysLeft();
        // }, 10000);
      }
    })
  }

  useEffect(() => {
    getDaysLeft();
  }, []);

  function drillUp(color, name) {
    setUserColor(color);
    setUserName(name);
  }

  return (
    <SessionProvider session={session}>
        <Component {...pageProps} drillUp={drillUp}/>
    </SessionProvider>
  )
}