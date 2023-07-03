import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from "next/router";
import Layout from '../components/Layout';

export default function Dump() {
  const [dumps, setDumps] = useState([]);

  async function dumpPosts() {
    await axios.get('/api/dumps').then(response => {
      setDumps(response.data)
    })
  } 

  // async function fetchDumps() {
  //   await axios.delete('/api/dumps').then(response => {
  //     const data = response.data;
  //     setDumps(data.dump);
  //     setModalVisible(data.modal);
  //     const deadline = new Date(data.dump[0].createdAt)
  //     deadline.setDate(deadline.getDate() + 14);
  //     const today = new Date();
  //     const deadlineTime = deadline.getTime();
  //     const todayTime = today.getTime();
  //     const difference = deadlineTime - todayTime;
  //     const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
  //     console.log(daysLeft);
  //   })
  // }

  useEffect(() => {
    dumpPosts();
  }, []);

  return (
    <Layout>
      <div className="mx-4 flex flex-col relative">
        <h2 className='mt-8 font-bold text-xl'>The dump</h2>
        {/* <button onClick={() => {setModalVisible(true)}} className='border border-litterBorder'>modal!</button> */}
        <div className="mt-6">
          {dumps.length > 0 && dumps.map((dump) => {
            if(dump.text === '') {return} else {
              return (
                <div key={dump._id} className="flex flex-col mb-6 rounded-lg py-2 px-3 border border-litterBorder">
                  {dump.createdAt && (
                    <span className="text-litterLightGray">
                    {(new Date(dump.createdAt))
                      .toISOString()
                      .replace('T', ' ')
                      .slice(0,11)
                      .split(' ')
                      .join(' ')
                    }
                    </span>
                  )}
                  {dump.text}
                </div>
              )
            }
          })}
        </div>
      </div>
    </Layout>
  )
}