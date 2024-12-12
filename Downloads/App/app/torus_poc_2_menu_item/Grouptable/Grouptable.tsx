'use client'
import React,{ useEffect, useState,useContext } from 'react'
import { Grid } from "@gravity-ui/page-constructor";
import { AxiosService } from '@/app/components/axiosService'
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import Tabletable  from './Tabletable';  
import { useInfoMsg } from '@/app/torusStaticHandlers/infoMsgHandler';
import { getCookie } from "@/app/components/cookieMgment"
import { TotalContext, TotalContextProps } from '@/app/globalContext';


const Table = ({lockedData,setLockedData,primaryTableData, setPrimaryTableData,/*display_cardData, setdisplay_cardData,tableData, settableData,*/checkToAdd,setCheckToAdd,refetch,
  setRefetch,dropdownData,setDropdownData}:any) => {
  const token:string = getCookie('token')
  const [allowedComponent,setAllowedComponent]=useState<any>("")
  const toast=useInfoMsg()
  const baseUrl:any = process.env.NEXT_PUBLIC_API_BASE_URL;
      const {display_card15add, setdisplay_card15add} = useContext(TotalContext) as TotalContextProps
      const {table7b723, settable7b723} = useContext(TotalContext) as TotalContextProps
  async function securityCheck() {
    const uf_authorizationCheckBody:uf_authorizationCheckDto={key:'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1',nodeName:'table',isTable : true}
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

  }
  useEffect(() => {    
    securityCheck()   
  }, [])
  return (
    <div className="col-start-1 col-end-13 row-start-3 row-end-7 gap-10px border border-slate-300 p-2 rounded-md">
      <Grid containerClass='grid grid-cols-12 gap-2 '>
        {allowedComponent.includes("table")|| allowedComponent.includes("ALL") ? <Tabletable lockedData={lockedData} setLockedData={setLockedData}  primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData}  refetch={refetch} setRefetch={setRefetch}  />: <div></div>}
      </Grid>
    </div>             
  )
}

export default Table