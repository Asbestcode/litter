import {getProviders, signIn, signOut, useSession} from 'next-auth/react'
import {useRouter} from "next/router";
import UsernameForm from '../components/UsernameForm';
import useUserInfo from "../hooks/useUserInfo";
import ProviderLogo from '../components/ProviderLogo';
import Layout from '@/components/Layout';
import Loading from '@/components/Loading';

export default function LoginPage({providers}) {
    const {data, status} = useSession();
    const {userInfo, status:userInfoStatus} = useUserInfo();
    const router = useRouter();

    if (status === 'loading') {
      return <Layout><Loading/></Layout>;
    }
    if (data) {
      router.push('/');
    }

    return (
      <Layout>
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
          <h2 className="text-black font-bold text-4xl mb-12">Welcome to Litter</h2>
          {Object.values(providers).map(provider => (
            <div key={provider.id}>
                <button onClick={async () => {await signIn(provider.id)}} className="bg-litterWhite pl-3 pr-5 pb-2 pt-2 text-black rounded-full flex items-center border border-litterBorder text-xl">
                  <ProviderLogo provider={provider.name}/>
                  Sign in with Garbage
                </button>
            </div>
          ))}
        </div>
      </Layout>
    )

  }
  
  export async function getServerSideProps() {
    const providers = await getProviders();
    return {
      props: {providers},
    }
  }