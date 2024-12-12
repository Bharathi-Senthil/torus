'use client'
import React,{ useEffect, useState,useContext } from 'react'
import { Grid } from "@gravity-ui/page-constructor";
import { AxiosService } from '@/app/components/axiosService'
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import Labelcontent  from "./Labelcontent";
import { useInfoMsg } from '@/app/torusStaticHandlers/infoMsgHandler';
import { getCookie } from "@/app/components/cookieMgment"
import { TotalContext, TotalContextProps } from '@/app/globalContext';


const DisplayCard = ({lockedData,setLockedData,primaryTableData, setPrimaryTableData,/*display_cardData, setdisplay_cardData,tableData, settableData,*/checkToAdd,setCheckToAdd,refetch,
  setRefetch,dropdownData,setDropdownData}:any) => {
  const token:string = getCookie('token')
  const [allowedComponent,setAllowedComponent]=useState<any>("")
  const toast=useInfoMsg()
  const baseUrl:any = process.env.NEXT_PUBLIC_API_BASE_URL;
      const {display_card15add, setdisplay_card15add} = useContext(TotalContext) as TotalContextProps
      const {table7b723, settable7b723} = useContext(TotalContext) as TotalContextProps
  async function securityCheck() {
    const uf_authorizationCheckBody:uf_authorizationCheckDto={key:'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1',nodeName:'display_card',}
    const uf_authorizationCheck = await AxiosService.post("/UF/AuthorizationCheck",uf_authorizationCheckBody,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )  
    if(uf_authorizationCheck?.data?.error === true){
      toast(uf_authorizationCheck?.data?.errorDetails?.message, 'danger')
      return
    }
    setAllowedComponent(uf_authorizationCheck.data)  

    const code = await AxiosService.post('/UF/code', {
      key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1',
      group: 'display_card'
    })
  
    if (code?.data?.error == true) { 
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    }else{      
        let codeStates: any = {}      
              codeStates['display_card'] = display_card15add; 
              codeStates['setdisplay_card'] = setdisplay_card15add
              codeStates['table'] = table7b723; 
              codeStates['settable'] = settable7b723
   
        codeExecution(code.data,codeStates)
    }
  }
  useEffect(() => {    
    securityCheck()   
  }, [])
  return (
    <div className="col-start-1 col-end-13 row-start-1 row-end-3 gap-10px border border-slate-300 p-2 rounded-md">
      <Grid containerClass='grid grid-cols-12 gap-2 '>
        {allowedComponent.includes("content")|| allowedComponent.includes("ALL") ? <Labelcontent   /* e74d4 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} /> : <div></div>}
      </Grid>
    </div>             
  )
}

export default DisplayCard