import { useState, useRef } from "react";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import Upload from "./Upload";
import { uid } from "uid";
import {random} from "../lib/randomImages";
import { FileDrop } from "react-file-drop";

export default function PostForm({onPost, parent, compact}) {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [isClickUploading, setIsClickUploading] = useState(false);
  const fileInputRef = useRef(null);

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
    const url = `https://litter-test.s3.eu-central-1.amazonaws.com/random/${piece}`;
    setImages(prev => [...prev, {id: uid(), src: url}]);
  }

  const onFileInputChange = (e) => {
    e.preventDefault();
    setIsClickUploading(true);
    const { files } = e.target;
    const data = new FormData();
    data.append('post', files[0]);
    fetch('/api/upload', {
      method: 'POST',
      body: data,
    }).then(async response => {
      const json = await response.json();
      const src = json.src;
      setImages(prev => [...prev, {id: uid(), src: src}]);
      setIsClickUploading(false);
    })
  }

  const onTargetClick = () => {
    fileInputRef.current.click()
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
                    minlength="1"
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
                  {isUploading || isClickUploading && 
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
              <FileDrop onTargetClick={onTargetClick}>
                <div className="text-litterBorder mr-4 h-6 flex cursor-pointer">
                  <input 
                    onChange={onFileInputChange}
                    ref={fileInputRef}
                    type="file"
                    className="hidden" 
                  />
                  <svg
                    className=""
                    xmlns="http://www.w3.org/2000/svg"
                    // width="63"
                    // height="55"
                    fill="none"
                    viewBox="0 0 63 55"
                  >
                    <path
                      fill="#fff"
                      d="M60 46.7c0 2.8-2.2 5-5 5H8.3c-2.8 0-5-2.2-5-5V8.2c0-2.8 2.2-5 5-5H55c2.8 0 5 2.2 5 5v38.5z"
                    ></path>
                    <path
                      fill="#000"
                      fillRule="evenodd"
                      d="M54.9 1H8.3c-3.9 0-7 3.1-7 7v39c0 3.9 3.1 7 7 7h46.6c3.9 0 7-3.1 7-7V8c0-3.8-3.1-7-7-7zM8.3 5h46.6c1.7 0 3 1.3 3 3v24.2c-4.9-5.1-7.6-7.5-10.8-7.6-2.9-.1-5.3 1.7-8.9 5.1-6.9-9.7-10.9-14.1-15.7-14.1-5.1 0-9.4 5.2-17.2 16.3V8c0-1.6 1.3-3 3-3zm46.6 45H8.3c-1.7 0-3-1.3-3-3v-8.2l.068-.097C13.728 26.761 18.81 19.5 22.5 19.5c3.757 0 8.882 7.33 17.308 19.383l.292.417c.6.9 1.9 1.1 2.8.5.9-.6 1.1-1.9.5-2.8-.372-.52-.73-1.042-1.085-1.558-.599-.87-1.187-1.726-1.815-2.542 3-2.8 4.9-4.4 6.4-4.4h.1c2.1.1 5.3 3.4 10.9 9.4v9c0 1.8-1.3 3.1-3 3.1zM40.7 19.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </FileDrop>
                <button onClick={randomImage} className="text-litterBorder mr-4 h-6 w-6">
                  <svg
                    className=""
                    xmlns="http://www.w3.org/2000/svg"
                    // width="55"
                    // height="55"
                    fill="none"
                    viewBox="0 0 55 55"
                  >
                    <path
                      fill="#fff"
                      d="M51.6 47c0 2.8-2.2 5-5 5H8c-2.8 0-5-2.2-5-5V8.5c0-2.8 2.2-5 5-5h38.6c2.8 0 5 2.2 5 5V47z"
                    ></path>
                    <path
                      fill="#000"
                      fillRule="evenodd"
                      d="M47 1H8C4.1 1 1 4.1 1 8v39c0 3.9 3.1 7 7 7h39c3.9 0 7-3.1 7-7V8c0-3.9-3.2-7-7-7zm3 46c0 1.7-1.3 3-3 3H8c-1.7 0-3-1.3-3-3V8c0-1.7 1.3-3 3-3h39c1.7 0 3 1.3 3 3v39zM15.7 11.4c-2.3 0-4.2 1.9-4.2 4.2 0 2.3 1.9 4.2 4.2 4.2 2.3 0 4.2-1.9 4.2-4.2 0-2.3-1.9-4.2-4.2-4.2zM35 15.6c0-2.3 1.9-4.2 4.2-4.2 2.4 0 4.3 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2-2.3 0-4.2-1.9-4.2-4.2zm0 23.7c0-2.3 1.9-4.2 4.2-4.2 2.4 0 4.2 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2-2.3 0-4.2-1.9-4.2-4.2zm-23.5 0c0-2.3 1.9-4.2 4.2-4.2 2.3 0 4.2 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2-2.3 0-4.2-1.9-4.2-4.2zM31.7 27a4.2 4.2 0 11-8.4 0 4.2 4.2 0 018.4 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <button onClick={handlePostSubmit} className="bg-litterDarkGray text-white px-5 py-1 rounded-full border border-litterBorder">post</button>
            </div>
          )}
        </div> 
        {compact && (
          <div className="ml-4 flex items-center">
            <FileDrop onTargetClick={onTargetClick}>
              <div className="text-litterBorder mr-4 h-7 flex cursor-pointer">
                <input 
                  onChange={onFileInputChange}
                  ref={fileInputRef}
                  type="file"
                  className="hidden" 
                />
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  // width="63"
                  // height="55"
                  fill="none"
                  viewBox="0 0 63 55"
                >
                  <path
                    fill="#fff"
                    d="M60 46.7c0 2.8-2.2 5-5 5H8.3c-2.8 0-5-2.2-5-5V8.2c0-2.8 2.2-5 5-5H55c2.8 0 5 2.2 5 5v38.5z"
                  ></path>
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M54.9 1H8.3c-3.9 0-7 3.1-7 7v39c0 3.9 3.1 7 7 7h46.6c3.9 0 7-3.1 7-7V8c0-3.8-3.1-7-7-7zM8.3 5h46.6c1.7 0 3 1.3 3 3v24.2c-4.9-5.1-7.6-7.5-10.8-7.6-2.9-.1-5.3 1.7-8.9 5.1-6.9-9.7-10.9-14.1-15.7-14.1-5.1 0-9.4 5.2-17.2 16.3V8c0-1.6 1.3-3 3-3zm46.6 45H8.3c-1.7 0-3-1.3-3-3v-8.2l.068-.097C13.728 26.761 18.81 19.5 22.5 19.5c3.757 0 8.882 7.33 17.308 19.383l.292.417c.6.9 1.9 1.1 2.8.5.9-.6 1.1-1.9.5-2.8-.372-.52-.73-1.042-1.085-1.558-.599-.87-1.187-1.726-1.815-2.542 3-2.8 4.9-4.4 6.4-4.4h.1c2.1.1 5.3 3.4 10.9 9.4v9c0 1.8-1.3 3.1-3 3.1zM40.7 19.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </FileDrop>
            <button onClick={handlePostSubmit} className="bg-litterDarkGray text-white px-5 py-1 rounded-full border border-litterBorder">reply</button>
          </div>
        )}
      </div>
    </form>
  )
}

