import { SessionProvider } from "next-auth/react"
import '../styles/globals.css';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import axios from "axios";
import { useDaysLeftStore } from "@/stores/useDaysLeftStore";
import { useState, useEffect } from "react";

TimeAgo.addLocale(en)

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const setDaysLeft = useDaysLeftStore((state) => state.setDaysLeft);

  function getDaysLeft(timestampLastDump) {
    const deadline = new Date(timestampLastDump)
    deadline.setDate(deadline.getDate() + 14)
    const today = new Date();
    const deadlineTime = deadline.getTime();
    const todayTime = today.getTime();
    const difference = deadlineTime - todayTime;
    const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
    setDaysLeft(daysLeft);
  }

  async function checkDumps() {
    await axios.delete('/api/dumps').then(response => {
      setModalVisible(response.data.modal);
      getDaysLeft(response.data.dump[0].createdAt)
    })
  }

  useEffect(() => {
    checkDumps();
  }, []);

  return (
    <SessionProvider session={session}>
        <Component {...pageProps} />
    </SessionProvider>
  )
}