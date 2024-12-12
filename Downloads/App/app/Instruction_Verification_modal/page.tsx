'use client'
import { Grid } from "@gravity-ui/page-constructor";
import { useLanguage } from "../components/languageContext";
import React,{ useContext } from "react";
import { AxiosService } from '@/app/components/axiosService'
import { uf_authorizationCheckDto,te_refreshDto,te_dfDto } from '@/app/interfaces/interfaces';
import { codeExecution } from "../utils/codeExecution";
import GroupInstruction_verification  from "./GroupInstruction_verification/GroupInstruction_verification";
import GroupSignatory_list  from "./GroupSignatory_list/GroupSignatory_list";
import { useEffect, useState } from "react";
import { useInfoMsg } from "../torusStaticHandlers/infoMsgHandler";
import { getCookie } from '@/app/components/cookieMgment'
import { TotalContext, TotalContextProps } from "../globalContext";


export default function InstructionVerificationModal() {
  const language=useLanguage();
  const {refetch, setRefetch} = useContext(TotalContext) as TotalContextProps   
  const [checkInstruction_verification,setCheckInstruction_verification,]=useState(false)
  const [checkSignatory_list,setCheckSignatory_list,]=useState(false)

  const toast=useInfoMsg()
  const baseUrl:any=process.env.NEXT_PUBLIC_API_BASE_URL
  const [lockedData, setLockedData] = useState<any>({})
  const [primaryTableData, setPrimaryTableData] = useState<any>({primaryKey:"",value:"",compName:""})
  const [checkToAdd, setCheckToAdd] = useState<any>({})
    const [dropdownData, setDropdownData] = useState<any>({})
  const {Instruction_verification10e47, setInstruction_verification10e47} = useContext(TotalContext) as TotalContextProps   
  const {Signatory_list7d3b5, setSignatory_list7d3b5} = useContext(TotalContext) as TotalContextProps   
    
  const token:string = getCookie('token'); 
  async function securityCheck() {
    if (token) {
      try {
        const uf_dfKey = await AxiosService.get(
        "/UF/dfKey?ufKey=CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1",
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
      const uf_authorizationCheckBody:uf_authorizationCheckDto={key:'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1'}
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
        setCheckInstruction_verification(true)
        setCheckSignatory_list(true)
      }

      //Code Execution
      const code = await AxiosService.post('/UF/code', {
        key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1'
      })
    
      if (code?.data?.error == true) { 
        //toast(code?.data?.errorDetails?.message, 'danger')
        //return
      }else{
        if (code?.data !="" ) {
          let codeStates: any = {}
          codeStates['Instruction_verification'] = Instruction_verification10e47
          codeStates['setInstruction_verification'] = setInstruction_verification10e47
          codeStates['Signatory_list'] = Signatory_list7d3b5
          codeStates['setSignatory_list'] = setSignatory_list7d3b5
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
        { checkInstruction_verification && <GroupInstruction_verification  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
     /*          Instruction_verificationData ={Instruction_verificationData} 
          setInstruction_verificationData={setInstruction_verificationData}
          Signatory_listData ={Signatory_listData} 
          setSignatory_listData={setSignatory_listData}
*/
          checkToAdd={checkToAdd} 
          setCheckToAdd={setCheckToAdd}  
          refetch={refetch}
          setRefetch={setRefetch}
          dropdownData={dropdownData} 
          setDropdownData={setDropdownData}        />}
        { checkSignatory_list && <GroupSignatory_list  
          lockedData={lockedData} 
          setLockedData={setLockedData} 
          primaryTableData={primaryTableData}
          setPrimaryTableData={setPrimaryTableData}
     /*          Instruction_verificationData ={Instruction_verificationData} 
          setInstruction_verificationData={setInstruction_verificationData}
          Signatory_listData ={Signatory_listData} 
          setSignatory_listData={setSignatory_listData}
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
    