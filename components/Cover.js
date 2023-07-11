import CoverPicture from "./CoverPicture"
import UserIcon from "./UserIcon"
import { useState } from "react";

export default function Cover({profileInfo, onSave}) {
    const [editMode, setEditMode] = useState(false);
    const [coverInfo, setCoverInfo] = useState(profileInfo);

    function updateUserImage(type, src) {
        setCoverInfo(prev => ({...prev,[type]:src}));
    }

    async function saveEdit() {
        const {username} = coverInfo;
        onSave(username);
        setEditMode(false)
    }

    function cancelEdit() {
        setCoverInfo(prev => {
            const {username} = profileInfo;
            return {...prev, username}
        });
        setEditMode(false)
    }

    return (
        <div>
            <CoverPicture 
                src={coverInfo.cover}
                onChange={src => updateUserImage('cover', src)}
            />
            <div className="flex justify-between mb-14">
                <div className="relative ml-5">
                    <div className="flex items-center absolute -top-14">
                        <UserIcon color={coverInfo.userColor}/>
                        {!editMode && (
                            <h1 className="text-2xl font-bold mt-8">{coverInfo.username}</h1>
                        )}
                        {editMode && (
                            <input 
                                type="text" 
                                value={coverInfo.username}
                                onChange={e => setCoverInfo(prev => ({...prev, username: e.target.value}))}
                                className="bg-litterBorder p-2 px-3 rounded-full text-white mt-12"/>
                        )}
                    </div>
                </div>
                <div>
                    {!editMode && (
                        <button onClick={() => setEditMode(true)} className="mt-4 bg-litterLightGray px-5 py-2 border border-litterBorder text-white rounded-full">
                            Edit
                        </button>
                    )}
                    {editMode && (
                        <div>
                            <button onClick={cancelEdit} className="mt-4 bg-litterLightGray px-5 py-2 border border-litterBorder text-white rounded-full">
                                Cancel
                            </button>
                            <button onClick={saveEdit} className="mt-4 bg-litterLightGray px-5 py-2 border border-litterBorder text-white rounded-full">
                                Save
                            </button>
                        </div>
                    )} 
                </div>
            </div>
        </div>
    )
}