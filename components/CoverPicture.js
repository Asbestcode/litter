import { FileDrop } from "react-file-drop"
import { useState, useRef } from "react";
import { PulseLoader } from "react-spinners";

export default function CoverPicture({src, onChange, editable=false}) {
    const [isFileNearby, setIsFileNearby] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    let extraClasses = '';
    if (isFileNearby) extraClasses += ' bg-green-500 opacity-60';
    if (!editable) extraClasses = '';

    function updateImage(files, e) {
        if (!editable) {
            return;
        }
        e.preventDefault();
        setIsFileNearby(false);
        setIsUploading(true);
        const data = new FormData();
        data.append('cover', files[0]);
        fetch('/api/upload', {
            method: 'POST',
            body: data,
        }).then(async response => {
            const json = await response.json();
            onChange(json.src);
            setIsUploading(false);
        })
    }

    const onFileInputChange = (e) => {
        if (!editable) {
            return;
        }
        e.preventDefault();
        setIsUploading(true);
        const { files } = e.target;
        const data = new FormData();
        data.append('post', files[0]);
        fetch('/api/upload', {
          method: 'POST',
          body: data,
        }).then(async response => {
          const json = await response.json();
          onChange(json.src);
          setIsUploading(false);
        })
      }
    
      const onTargetClick = () => {
        fileInputRef.current.click()
      }

    return (
        <div className="overflow-hidden">
            <FileDrop
                onDrop={updateImage}
                onTargetClick={onTargetClick} 
                onFrameDragEnter={() => setIsFileNearby(true)}
                onFrameDragLeave={() => setIsFileNearby(false)}
                onFrameDrop={() => setIsFileNearby(false)}
            >
                <div className="relative bg-litterBorder text-white">
                    <input 
                        onChange={onFileInputChange}
                        ref={fileInputRef}
                        type="file"
                        className="hidden" 
                    />
                    <div className={'absolute inset-0 z-10 '+extraClasses}></div>   
                    {isUploading && (    
                        <div className="absolute inset-0 flex items-center justify-center bg-green-500 opacity-60"> 
                            <PulseLoader size={12} color={'#fff'}/>
                        </div>
                    )}
                    <div className="flex aspect-w-7 aspect-h-3 w-full overflow-hidden">
                        {src && (<img src={src} className="object-cover object-top" alt=""/>)}
                        {!src && (<div className="w-full flex justify-center items-center">{editable ? 'choose image!' : 'no image'}</div>)}
                    </div>
                </div>
            </FileDrop>
        </div>
    )
}