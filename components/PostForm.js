import { useState } from "react";
import axios from "axios";

export default function PostForm({onPost, parent, compact}) {
    const [text,setText] = useState('');

    async function handlePostSubmit(e) {
        e.preventDefault();
        await axios.post('/api/posts', {text, parent});
        setText('');
        if(onPost) {
            onPost()
        }
    }

    return (
        <form onSubmit={handlePostSubmit}>
            {!compact && (
                <div>
                    <div className="grow rounded-lg border border-litterBorder overflow-hidden h-20 mb-2">
                        <textarea
                            className="w-full p-2 bg-litterLightGray placeholder-white text-white focus:outline-0 resize-none m-0 h-full"
                            placeholder={'put some garbage'}
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    </div>
                    <div className="text-right">
                        <button className="bg-litterBlue px-5 py-2 border border-litterBorder text-white rounded-full" type="submit">
                            submit
                        </button>
                    </div>
                </div>
            )}
            {compact && (
                <div className="flex items-center gap-2">
                    <div className="grow rounded-lg border border-litterBorder h-11 overflow-hidden">
                        <textarea
                            className="w-full p-2 bg-litterLightGray placeholder-white text-white focus:outline-0 resize-none h-full m-0 no-scrollbar"
                            placeholder={'reply some garbage'}
                            value={text}
                            onChange={e => setText(e.target.value)}
                        />
                    </div>
                    <div className="text-right">
                        <button className="bg-litterBlue px-5 py-2 border border-litterBorder text-white rounded-full" type="submit">
                            comment
                        </button>
                    </div>
                </div>
            )}
        </form>
    )
}

//     <div className="text-right">
//         <button className="bg-litterBlue px-5 py-2 border border-litterBorder text-white rounded-full" type="submit">
//             submit
//         </button>
//     </div>


// className={(compact ? 'items-center' : '') + " flex"}