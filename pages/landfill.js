import {useEffect, useState} from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Loading from '@/components/Loading';
import { useDaysLeftStore } from '@/stores/useDaysLeftStore';

export default function Landfill() {
  const [loading, setLoading] = useState(true);
  const [dumps, setDumps] = useState([]);
  const daysLeft = useDaysLeftStore((state) => state.days);

  async function dumpPosts() {
    await axios.get('/api/dumps').then(response => {
      setDumps(response.data);
      setLoading(false);
    })
  }

  useEffect(() => {
    dumpPosts();
  }, []);

  return (
    <Layout>
      {loading ? (<Loading/>) : (
        <div className="mx-4 flex flex-col relative">
          <p className='mt-10 text-white text-center rounded-lg bg-blue-600 p-6'>
            The garbage collection will pick up the garbage in <span className='font-bold '>{daysLeft} {daysLeft === 1 ? 'day' : 'days'}!</span>
          </p>
          <h2 className='mt-8 text-2xl text-litterLightGray text-center'>The landfill</h2>
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
        </div>)
      }
    </Layout>
  )
}