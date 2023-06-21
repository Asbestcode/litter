import { useState } from "react";
import axios from "axios";

export default function PostForm({onPost}) {
    const [text,setText] = useState('');

    async function handlePostSubmit(e) {
        e.preventDefault();
        await axios.post('/api/posts', {text});
        setText('');
        if(onPost) {
            onPost()
        }
    }

    return (
        <form 
            onSubmit={handlePostSubmit}
            style={{display: "inline", backgroundColor: "lightgrey", padding: "10px"}}
        >
            <textarea
                rows="4" 
                cols="100"
                style={{width: "100%"}}
                placeholder={'write some garbage'}
                value={text}
                onChange={e => setText(e.target.value)}/>
            <button 
                type="submit"
                style={{width: "auto", padding: "10px", cursor:"pointer", fontSize: "1rem"}}
            >
                submit
            </button>
        </form>
    )
}