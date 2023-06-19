import {getProviders, signIn} from 'next-auth/react'

export default function Home({providers}) {
    return (
      <div>
        {Object.values(providers).map(provider => 
            <button key={provider.id} 
            onClick={async () => {await signIn(provider.id)}}>Sign in with {provider.name}</button>
        )}
      </div>
    )
  }

export async function getServerSideProps() {
    const providers = await getProviders()
    return {
        props: {providers}
    }
}