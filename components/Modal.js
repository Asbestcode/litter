import GarbageTruck from "./GarbageTruck";

const fixedContainer = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(0,0,0,.6)",
    zIndex: 99
  };
  
  const contentContainer = {
    width: "200px",
    height: "200px",
    position: "relative",
    background: "#fff",
    zIndex: 99,
    padding: "30px",
  };

export default function Modal({onClose, content, garbage=false, alreadyTaken=false}) {
  return (
    <div style={fixedContainer}>
      <div style={contentContainer} className="rounded-lg">
        {garbage && (
          <GarbageTruck/>
        )}
        {alreadyTaken && (
          <div className="flex justify-center">
            <div className="w-3/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>        
            </div>
          </div>
        )}
        <p className="text-center font-bold">{content}</p>
        <div className="absolute top-1 right-1">
          <button onClick={() => onClose(false)} className='rounded-full border-2 border-litterBorder'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}