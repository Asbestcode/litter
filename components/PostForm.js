import { useState, useEffect } from "react";
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
    <form className="mx-4" onSubmit={handlePostSubmit}>
      <div className={(compact ? 'flex items-center' : 'flex flex-col flex-end')}>
        <div className="grow">
          <Upload onUploadFinish={src => setImages(prev => [...prev, {id: uid(), src: src}])}>
            {({isUploading}) => (
              <div className="">
                <div className={(compact ? 'h-10' : 'h-24')+" w-full rounded-lg overflow-hidden border border-litterBorder"}>
                  <textarea
                    className={(compact ? 'h-10' : 'h-24')+" w-full p-2 bg-litterDarkGray text-litterLightGray resize-none"}
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
            <div className="text-right pt-2 pb-2">
              <button className="bg-litterBlue text-white px-5 py-1 rounded-full border border-litterBorder">reply</button>
            </div>
          )}
        </div> 
        {compact && (
          <div className="pl-2">
            <button className="bg-litterBlue text-white px-5 py-1 rounded-full border border-litterBorder">post</button>
          </div>
        )}
      </div>
    </form>
  )
}