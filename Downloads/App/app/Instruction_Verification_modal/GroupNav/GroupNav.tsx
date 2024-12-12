'use client'
import Navbar from '@/app/components/navBar'

const GroupNav = ({ nodeDetails }: any) => {
    
  const navBarData = [
  {
    "menuGroup": "torus_poc_2",
    "screenDetails": [
      {
        "name": "torus_poc_2_menu_item",
        "key": "CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1"
      }
    ]
  }
]
  return (
    <div className='col-span-1 bg-gray-100 sm:col-span-12 md:col-span-6 lg:col-span-12 lg:col-start-1 xl:col-span-12 xl:col-start-1'>
      <Navbar data={navBarData} />
    </div>
  )
}

export default GroupNav
