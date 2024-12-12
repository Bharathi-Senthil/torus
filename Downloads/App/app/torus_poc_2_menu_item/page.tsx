'use client'
import { Grid } from "@gravity-ui/page-constructor";
import { useLanguage } from "../components/languageContext";
import React,{ useContext } from "react";
import { AxiosService } from '@/app/components/axiosService'
import { uf_authorizationCheckDto,te_refreshDto,te_dfDto } from '@/app/interfaces/interfaces';
import { codeExecution } from "../utils/codeExecution";
import Groupdisplay_card  from "./Groupdisplay_card/Groupdisplay_card";
import Grouptable  from "./Grouptable/Grouptable";
import { useEffect, useState } from "react";
import { useInfoMsg } from "../torusStaticHandlers/infoMsgHandler";
import { getCookie } from '@/app/components/cookieMgment'
import { TotalContext, TotalContextProps } from "../globalContext";


export default function TorusPoc2MenuItem() {
  const language=useLanguage();
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps   
  const [checkdisplay_card,setCheckdisplay_card,]=useState(false)
  const [checktable,setChecktable,]=useState(false)

  const toast=useInfoMsg()
  const baseUrl:any=process.env.NEXT_PUBLIC_API_BASE_URL
  const [lockedData, setLockedData] = useState<any>({})
  const [primaryTableData, setPrimaryTableData] = useState<any>({primaryKey:"",value:"",compName:""})
  const [checkToAdd, setCheckToAdd] = useState<any>({})
    const [dropdownData, setDropdownData] = useState<any>({})
  const {display_card15add, setdisplay_card15add} = useContext(TotalContext) as TotalContextProps   
        const {table7b723, settable7b723} = useContext(TotalContext) as TotalContextProps
    
  const token:string = getCookie('token'); 
  async function securityCheck() {
    if (token) {
      try {
        const uf_dfKey = await AxiosService.get(
        "/UF/dfKey?ufKey=CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        if(uf_dfKey?.data?.error == true){
          toast(uf_dfKey?.data?.errorDetails?.message, 'danger')
          return
        }
        document.cookie = `dfKey=${uf_dfKey.data}`

        if(uf_dfKey.data.length > 0){
          for (let i = 0; i < uf_dfKey.data.length; i++) {
            
            
            let te_dfBody:te_dfDto={
              key: uf_dfKey.data[i]
            }
            const te_df = await AxiosService.post(
              "/te/df",
              te_dfBody,
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )
            if(te_df?.data?.error == true){
              toast(te_df?.data?.errorDetails?.message, 'danger')
              return
            }
            const te_refreshBody:te_refreshDto={
              key: uf_dfKey.data[i],
              upId: te_df.data.upid  
            }
            const te_refresh:any=await AxiosService.post("/te/refresh",te_refreshBody,{
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            if(te_refresh?.data?.error == true){
              toast(te_refresh?.data?.errorDetails?.message, 'danger')
              return
            }
          }
          }

      } catch (err: any) {
        toast(err?.message, 'danger')
      }
      const uf_authorizationCheckBody:uf_authorizationCheckDto={key:'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1'}
      const uf_authorizationCheck = await AxiosService.post(
          "/UF/AuthorizationCheck",uf_authorizationCheckBody,
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
      if (uf_authorizationCheck.data.result == 'AA') {
        setCheckdisplay_card(true)
        setChecktable(true)
      }

      //Code Execution
      const code = await AxiosService.post('/UF/code', {
        key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1'
      })
    
      if (code?.data?.error == true) { 
        //toast(code?.data?.errorDetails?.message, 'danger')
        //return
      }else{
        if (code?.data !="" ) {
          let codeStates: any = {}
          codeStates['display_card'] = display_card15add
          codeStates['setdisplay_card'] = setdisplay_card15add
          codeStates['table'] = table7b723
          codeStates['settable'] = settable7b723
          codeExecution(code.data,codeStates)
        }  
      }
    }else{
      toast('token not found','danger')
    }
    
  }

  useEffect(() => {    
    securityCheck()   
  }, [])


  return (
    <>
      <Grid containerClass="grid grid-cols-12 gap-2 " >
        { checkdisplay_card && <Groupdisplay_card  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
     /*          display_cardData ={display_cardData} 
          setdisplay_cardData={setdisplay_cardData}
          tableData ={tableData} 
          settableData={settableData}
*/
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}        />}
        { checktable && <Grouptable  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
     /*          display_cardData ={display_cardData} 
          setdisplay_cardData={setdisplay_cardData}
          tableData ={tableData} 
          settableData={settableData}
*/
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}        />}
      </Grid> 
    </>
  )
}
    