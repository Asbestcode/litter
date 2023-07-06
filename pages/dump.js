import {useSession} from 'next-auth/react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useRouter} from "next/router";
import Layout from '../components/Layout';
import Loading from '@/components/Loading';

export default function Dump() {
  const [loading, setLoading] = useState(true);
  const [dumps, setDumps] = useState([]);

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
          <h2 className='mt-8 font-bold text-xl'>The dump</h2>
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