import { FileDrop } from "react-file-drop"
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export default function CoverPicture({src, onChange, editable=false}) {
    const [isFileNearby, setIsFileNearby] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
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

    return (
        <div className="overflow-hidden">
            <FileDrop
                onDrop={updateImage} 
                onFrameDragEnter={() => setIsFileNearby(true)}
                onFrameDragLeave={() => setIsFileNearby(false)}
                onFrameDrop={() => setIsFileNearby(false)}
            >
                <div className="relative bg-litterBorder text-white">
                    <div className={'absolute inset-0 z-10 '+extraClasses}></div>   
                    {isUploading && (    
                        <div className="absolute inset-0 flex items-center justify-center bg-green-500 opacity-60"> 
                            <PulseLoader size={12} color={'#fff'}/>
                        </div>
                    )}
                    <div className="flex aspect-w-7 aspect-h-3 w-full overflow-hidden">
                        {src && (<img src={src} className="object-cover object-top" alt=""/>)}
                        {!src && (<div className="w-full flex justify-center items-center">{editable ? 'drop image!' : 'no image'}</div>)}
                    </div>
                </div>
            </FileDrop>
        </div>
    )
}