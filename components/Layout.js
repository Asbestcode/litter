import SideBar from "./SideBar"
import RightBar from "./RightBar"
import MobileMenu from "./MobileMenu"

export default function Layout({children}) {
  return (
  <div className="max-w-4xl mx-auto min-h-screen flex sm:gap-12 sm:flex-row flex-col">
    <div 
      style={{background: 'linear-gradient(180deg, #e7e9ea 0%, #DCDEDF 90%)'}}
      className="sm:hidden fixed bottom-0 z-50 w-screen py-2 bg-litterLightGray"
    >
      <MobileMenu/>
    </div>
    <div className="hidden sm:block">
      <SideBar/>
    </div>
    <div className="bg-litterWhite pb-16 sm:pb-6 w-full min-h-screen">
      {children}
    </div>
    <div className="hidden sm:block">
      <RightBar/>
    </div>
  </div>
  )
}