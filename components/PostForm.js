import { useState } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import Upload from "./Upload";
import { uid } from "uid";

export default function PostForm({onPost, parent, compact}) {
  const [text,setText] = useState('');
  const [images, setImages] = useState([]);

  async function handlePostSubmit(e) {
    e.preventDefault();
    await axios.post('/api/posts', {text, parent, images});
    setText('');
    setImages([]);
    if(onPost) {
        onPost()
    }
  }

  function deleteImage(imageToRemove) {
    setImages((prev) => prev.filter((image) => image.id !== imageToRemove))
  }

  return (
    <form onSubmit={handlePostSubmit}>
      {!compact && (
        <div className="ml-4 mr-4">
          <Upload onUploadFinish={src => setImages(prev => [...prev, {id: uid(), src: src}])}>
            {({isUploading}) => (
              <div>
                <div className="grow rounded-lg overflow-hidden h-20 mb-2 border border-litterBorder">
                  <textarea
                    className="w-full p-2 bg-litterLightGray placeholder-white text-white focus:outline-0 resize-none m-0 h-full"
                    placeholder={'put some garbage'}
                    value={text}
                    onChange={e => setText(e.target.value)}
                  />
                </div>
                <div className="flex -mx-2">
                  {images.length > 0 && images.map(img => (
                    <div key={img.id} className="h-24 m-2 rounded-lg overflow-hidden border border-litterBorder relative">
                      <div className="absolute inset-0 flex justify-center items-center z-10">
                        <button onClick={() => deleteImage(img.id)} 
                          className="px-2 py-1 text-bg-litterBorder bg-litterWhite rounded-full border border-litterBorder"
                        >✕</button>
                      </div>
                      <img src={img.src} alt="" className="h-24"/>
                    </div>
                  ))}
                  {isUploading && 
                    <div className="h-24 w-24 m-2 bg-twitterBorder flex items-center justify-center">
                      <PulseLoader size={12} color={'#fff'}/>
                    </div>
                  }
                </div>
              </div>
            )}
          </Upload>
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