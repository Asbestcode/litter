import { FileDrop } from "react-file-drop"
import { useState } from "react";
import Image from "next/image";

export default function CoverPicture({src}) {
    const [isFileNearby, setIsFileNearby] = useState(false);
    const [isFileOver, setIsFileOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
  let extraClasses = '';
  if (isFileNearby && !isFileOver) extraClasses += ' bg-blue-500 opacity-40';
  if (isFileOver) extraClasses += ' bg-blue-500 opacity-90';
    // "absolute top-0 right-0 bottom-0 left-0 bg-red-500 opacity-50"

    function updateImage(files, e) {
        e.preventDefault();
        setIsFileNearby(false);
        setIsFileOver(false);
        setIsUploading(true);
        const data = new FormData();
        data.append('cover', files[0]);
        fetch('/api/upload', {
            method: 'POST',
            body: data,
        }).then(async response => {
            const json = await response.json();
            const cover = json.user.cover;
            setIsUploading(false);
        })

    }

    return (
        <div style={{height:'15rem', overflow:'hidden'}}>
            <FileDrop
                onDrop={updateImage} 
                onDragOver={() => setIsFileOver(true)}
                onDragLeave={() => setIsFileOver(false)}
                onFrameDragEnter={() => setIsFileNearby(true)}
                onFrameDragLeave={() => setIsFileNearby(false)}
            >
                <div className={"relative bg-litterBorder text-white"}>
                    <div className={'absolute inset-0 '+extraClasses}></div>   
                    {isUploading && (    
                        <div className="absolute inset-0 flex items-center justify-center" style={{backgroundColor:'rgba(48, 140, 216,0.9)', color: 'white'}}> 
                            Loading
                        </div>
                    )}
                    <div className={"cover flex items-center overflow-hidden "}>
                        {src && (<img src={src} className="w-full" alt=""/>)}
                        {!src && (<div style={{height:'15rem',}} className="w-full flex justify-center items-center">drag & drop image!</div>)}
                    </div>
                </div>
            </FileDrop>
        </div>
    )
}


// <div className="absolute w-full h-full flex justify-center items-center bg-black text-white">
    
// </div>