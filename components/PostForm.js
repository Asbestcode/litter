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
        <form onSubmit={handlePostSubmit}>
            <div className="grow rounded-lg border border-litterWhite overflow-hidden h-20">
                <textarea
                className="w-full p-2 bg-transparent text-litterWhite resize-none m-0 h-full"
                placeholder={'write some garbage'}
                value={text}
                onChange={e => setText(e.target.value)}
                />
            </div>
            <div className="text-right">
                <button className="bg-litterBlue px-5 py-2 rounded-full" type="submit">
                    submit
                </button>
            </div>
        </form>
    )
}