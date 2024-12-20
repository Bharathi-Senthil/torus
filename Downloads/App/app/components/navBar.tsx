'use client'
import React, { useEffect, useState } from 'react'
import { Button, Container, DropdownMenu } from '@gravity-ui/uikit'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { Logo } from '@/app/components/Logo'
import i18n from '@/app/components/i18n'
import { useLanguage } from './languageContext'
import { AxiosService } from '@/app/components/axiosService'
import { useInfoMsg } from '../torusStaticHandlers/infoMsgHandler'
import { getCookie } from '@/app/components/cookieMgment'
import { uf_authorizationCheckDto } from '../interfaces/interfaces'


const Navbar = ({ data }: any) => {
  const token: string = getCookie('token')
  const routes = useRouter()
  const [screenNames, setScreenNames] = useState<any[]>([])
  const language = useLanguage()
  const keyset: any = i18n.keyset("language")
  const toast:any=useInfoMsg()
  const baseUrl : any = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getScreenAccess = async () => {
    let screenData: any = []
    data[0].screenDetails.map((value: any, index: any) => {
      screenData.push({ screenName: value.name, ufKey: value.key })
    })
    let names: any = []
    for (let i = 0; i < screenData.length; i++) {
      try {
        const UF_AuthorizationCheckBody :uf_authorizationCheckDto={
          key: screenData[i].ufKey,
          screenNames: screenData[i].screenName
        }
        const UF_AuthorizationCheck : any= await AxiosService.post("/UF/AuthorizationCheck",
            UF_AuthorizationCheckBody,{
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        if(UF_AuthorizationCheck?.data?.error === true){
          toast(UF_AuthorizationCheck?.data?.errorDetails?.message, 'danger')
          return
        }
        if (UF_AuthorizationCheck.data.result) {
          if (UF_AuthorizationCheck.data.result == 'AA') {
            names.push({
              action: () => routes.push('/' + screenData[i].screenName),
              text: keyset(screenData[i].screenName)
            })
          }
        }
      } catch (err) {
        console.log(err)
      }
    }


    setScreenNames(names)
   
  }

  useEffect(() => {
    getScreenAccess()
  }, [])

  return (
    <Container className='flex gap-4 bg-gray-300 p-4 text-white'>
      <Logo />
      <DropdownMenu
        renderSwitcher={props => (
          <Button {...props} view='flat'>
            {keyset(data[0].menuGroup)}
          </Button>
        )}
        items={screenNames}
      />
     
    </Container>
  )
}

export default Navbar
