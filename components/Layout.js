import SideBar from "./SideBar"
import RightBar from "./RightBar"

export default function Layout({children}) {
  return (
  <div className="relative">
    <SideBar/>
    <div className="max-w-xl mx-auto bg-litterWhite min-h-screen pb-6">
      {children}
    </div>
    <RightBar/>
  </div>
  )
}