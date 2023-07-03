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
    // position: "fixed",
    // top: "10%",
    // left: "20%",
    background: "#fff",
    zIndex: 99,
    padding: "30px",
    // transfrom: "translate(-50%, -50%)"
  };

export default function Modal({onClose}) {
  return (
    <div style={fixedContainer}>
      <div style={contentContainer}>
      <button onClick={() => onClose(false)} className='rounded-full border border-litterBorder'>Close Modal</button>
      </div>
    </div>
  )
}