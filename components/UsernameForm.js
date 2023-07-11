import {useEffect, useState} from "react";
import useUserInfo from "../hooks/useUserInfo";
import {useRouter} from "next/router";
import UserIcon from "./UserIcon";
import Layout from "./Layout";

export default function UsernameForm() {
    const {userInfo, status} = useUserInfo();
    const [username, setUsername] = useState('');
    const [userColor, setUserColor] = useState('#FFFFFF')
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') {
          return;
        }
        if (username === '') {
          const defaultUsername = 'username';
          setUsername(defaultUsername);
        }
      }, [status])
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        const userData = {name: username, color: userColor}
        await fetch('/api/users', {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(userData),
        });
        setTimeout(() => {
            router.reload();
        }, 1000);
    }

    if(status === 'loading') {
        return '';
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleFormSubmit} className="text-center bg-litterWhite text-black p-8 rounded-xl">
                <p className="text-xl mb-4">pick a username</p>
                <input
                    className="block w-full mb-12 bg-litterWhite px-3 py-1 rounded-full border-2 border-litterBorder" 
                    type="text" 
                    placeholder={'username'} 
                    value={username}
                    maxLength = "10"
                    minLength = "2" 
                    onChange={e => {setUsername(e.target.value)}}
                />
                <p className="text-xl mb-4">pick a color for your garbage can</p>
                <div className="flex flex-row justify-around items-center mb-10">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-litterBorder">
                        <input
                            style={{  appearance: "none",
                                background: "none",
                                border: "0",
                                cursor: "pointer",
                                padding: "0",
                                width: "200%",
                                height: "200%",
                                transform: "translate(-25%, -25%)"}}
                            type="color" 
                            value={userColor} 
                            onChange={e => {setUserColor(e.target.value)}}
                        />
                    </div>
                    <p>➜</p>
                    <div className="flex sm:h-36">
                        <UserIcon color={userColor}/>
                    </div>
                </div>
                <button type="submit" className="block bg-litterDarkGray w-full rounded-full py-1 text-white border-2 border-litterBorder">
                    continue
                </button>
            </form>
        </div>       
    )
}