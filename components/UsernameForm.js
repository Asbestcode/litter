import {useEffect, useState} from "react";
import useUserInfo from "../hooks/useUserInfo";
import {useRouter} from "next/router";

export default function UsernameForm() {
    const {userInfo, status} = useUserInfo();
    const [username, setUsername] = useState('');
    const [userColor, setUserColor] = useState('#FFFFFF')
    const router = useRouter();
    
    async function handleFormSubmit(e) {
        e.preventDefault();
        const userData = {name: username, color: userColor}
        await fetch('/api/users', {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(userData),
        });
        router.reload();
    }

    if(status === 'loading') {
        return '';
    }

    return (
        <div>
            <form 
                style={{
                    fontFamily: "sans-serif", 
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    backgroundColor: "lightgrey",
                    padding: "10px"
                }}
                onSubmit={handleFormSubmit}
            >
                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <h3>pick a username</h3>
                    <input
                        style={{padding: "10px"}} 
                        type="text" 
                        placeholder={'username'} 
                        value={username}
                        maxlength = "12" 
                        onChange={e => {setUsername(e.target.value)}}/>
                </div>
                <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                    <h3>pick a color for your garbage can</h3>
                    <div style={{
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-around", 
                        width: "100%"
                    }}>
                        <input
                            style={{height: "50px"}}  
                            type="color" 
                            value={userColor} 
                            onChange={e => {setUserColor(e.target.value)}}/>
                        <p style={{fontSize: "2rem"}}>➜</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={108}
                            height={135}
                            fill="none"
                            // {...props}
                        >
                            <path
                            fill={userColor}
                            d="m11 39.5 9 76 7 8 11 2.5 41.5-2.5 5.5-8 10-75 3.5-1V29l-10-7.5H22L9 26 6 36l5 3.5Z"
                            />
                            <path
                            fill="#000"
                            d="M70.31 112.5c.08.01.17.01.25.01 1.64 0 3.03-1.26 3.17-2.93l4.35-54.96a3.18 3.18 0 0 0-6.34-.5l-4.34 54.96a3.16 3.16 0 0 0 2.91 3.42ZM56.36 109.33c0 1.76-1.42 3.18-3.18 3.18-1.76 0-3.18-1.42-3.18-3.18V54.37c0-1.76 1.42-3.18 3.18-3.18 1.76 0 3.18 1.42 3.18 3.18v54.96ZM36.05 112.5c-.08.01-.17.01-.25.01-1.64 0-3.04-1.26-3.17-2.93l-4.35-54.96a3.18 3.18 0 0 1 2.92-3.42 3.188 3.188 0 0 1 3.42 2.92l4.35 54.96a3.18 3.18 0 0 1-2.92 3.42Z"
                            />
                            <path
                            fill="#000"
                            fillRule="evenodd"
                            d="M86.64 18.28c9.1-.01 16.52 7.4 16.53 16.51l-.01 4.03c.01 2.3-1.82 4.16-4.1 4.23l-8.8 71.44c-1.04 8.79-8.52 15.43-17.39 15.43h-39.4c-8.87 0-16.35-6.64-17.39-15.45L7.29 43.12h-.42c-.38 0-.76-.05-1.12-.15-.71-.19-1.36-.57-1.88-1.09a4.28 4.28 0 0 1-1.24-3v-4.01c0-4.42 1.71-8.57 4.83-11.69 3.12-3.13 7.27-4.85 11.68-4.85l15.32-.01V16.6c-.01-6.56 5.32-11.9 11.88-11.9l13.08-.01c6.56-.01 11.9 5.32 11.9 11.88v1.72l15.32-.01Zm-27.21-5.12-13.08.01c-1.89 0-3.42 1.54-3.42 3.41v1.72l19.91-.01v-1.72a3.414 3.414 0 0 0-3.41-3.41Zm22.42 100.3 8.64-70.14.15-.26-74.9.05.12.21 8.64 70.12c.54 4.56 4.4 7.99 8.98 7.99h39.4c4.57 0 8.43-3.42 8.97-7.97Zm-68.39-84.3a8.017 8.017 0 0 0-2.35 5.47l83.58-.05c-.12-4.34-3.69-7.82-8.05-7.82l-67.49.04c-2.15 0-4.17.84-5.69 2.36Z"
                            clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <button 
                    style={{width: "auto", padding: "10px", cursor:"pointer", fontSize: "1rem"}}
                    type="submit"
                >
                    continue
                </button>
            </form>
        </div>
        
    )
}