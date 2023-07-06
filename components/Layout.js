import SideBar from "./SideBar"
import RightBar from "./RightBar"

export default function Layout({children}) {
  return (
  <div className="max-w-4xl mx-auto min-h-screen flex gap-12">
    <div className="">
      <SideBar/>
    </div>
    <div className="bg-litterWhite pb-6">
      {children}
    </div>
    <div className="">
      <RightBar/>
    </div>
  </div>
  )
}