import { useState } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import Upload from "./Upload";
import { uid } from "uid";
import {random} from "../lib/randomImages"

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

  function randomImage(e) {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * random.length);
    const piece = random[randomNumber];
    const url = `https://litter-test.s3.eu-central-1.amazonaws.com/random/${piece}`
    setImages(prev => [...prev, {id: uid(), src: url}])
  }

  return (
    <form className="mx-4">
      <div className={(compact ? 'flex items-center' : 'flex flex-col flex-end')}>
        <div className="grow">
          <Upload onUploadFinish={src => setImages(prev => [...prev, {id: uid(), src: src}])}>
            {({isUploading}) => (
              <div className="">
                <div className={(compact ? 'h-10' : 'h-24')+" w-full rounded-lg overflow-hidden border border-litterBorder"}>
                  <textarea
                    className={(compact ? 'h-10' : 'h-24')+" w-full p-2 bg-litterDarkGray text-litterWhite resize-none no-scrollbar"}
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
          {!compact && (
            <div className="flex items-center justify-end pt-2 pb-2">
                <button onClick={randomImage} className="text-litterBorder mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-6 w-6 bg-white rounded"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13 1a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V3a2 2 0 012-2h10zM3 0a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V3a3 3 0 00-3-3H3z"></path>
                    <path fill="" d="M5.5 4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm8 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-8 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm4-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                  </svg>
                </button>
                <button onClick={handlePostSubmit} className="bg-litterDarkGray text-white px-5 py-1 rounded-full border border-litterBorder">post</button>
            </div>
          )}
        </div> 
        {compact && (
          <div className="ml-4">
            <button onClick={handlePostSubmit} className="bg-litterDarkGray text-white px-5 py-1 rounded-full border border-litterBorder">reply</button>
          </div>
        )}
      </div>
    </form>
  )
}

