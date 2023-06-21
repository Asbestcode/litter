import {getProviders, signIn, signOut, useSession} from 'next-auth/react'
import {useRouter} from "next/router";
import UsernameForm from '../components/UsernameForm';
import useUserInfo from "../hooks/useUserInfo";
import ProviderLogo from '../components/ProviderLogo';

export default function LoginPage({providers}) {
    const {data, status} = useSession();
    const {userInfo, status:userInfoStatus} = useUserInfo();
    const router = useRouter();

    if (status === 'loading') {
      return 'loading';
    }
    if (data) {
      router.push('/');
    }

    return (
        <div className="flex flex-col gap-4 items-center justify-center h-screen">
          <h2 className="text-white">Welcome to Litter</h2>
          {Object.values(providers).map(provider => (
            <div key={provider.id}>
                <button onClick={async () => {await signIn(provider.id)}} className="bg-litterWhite pl-3 pr-5 py-2 text-black rounded-full flex items-center">
                  <ProviderLogo provider={provider.name}/>
                  Sign in with {provider.name}
                </button>
            </div>
          ))}
        </div>
    )

  }
  
  export async function getServerSideProps() {
    const providers = await getProviders();
    return {
      props: {providers},
    }
  }