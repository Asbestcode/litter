import {getProviders, signIn, signOut, useSession} from 'next-auth/react'
import {useRouter} from "next/router";
import UsernameForm from '../components/UsernameForm';
import useUserInfo from "../hooks/useUserInfo";

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
        <div>
          <h2 style={{fontFamily: "sans-serif"}}>Welcome to Litter,<br/> please sign in:</h2><br/>
        {Object.values(providers).map(provider => (
            <div key={provider.id}>
                <button
                  style={{width: "100%", padding: "19px", cursor: "pointer"}} 
                  onClick={async () => {await signIn(provider.id)}}>
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