import Link from 'next/link';
import {signOut, useSession} from 'next-auth/react'
import useUserInfo from "../hooks/useUserInfo";

export default function TopBar() {
    const {userInfo, setUserInfo, status:userInfoStatus} = useUserInfo();
    if (userInfoStatus === 'loading') {
        return;
      }
    // async function logout() {
    //     setUserInfo(null);
    //     await signOut();
    // }
    return (
        <div 
            style={{
                position: "sticky",
                display: "flex",
                justifyContent: "flex-start",
                top: "0",
                left: "0",
                padding: "20px",
                backgroundColor: "lightgrey",
            }}
        >
            <button 
                // onClick={logout}
                disabled={true}          
                style={{
                fontSize: "1rem",
                padding: "10px",
                cursor: "pointer"
            }}>
                doesnt work
            </button>
        </div>
    )
}