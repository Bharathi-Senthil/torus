'use client'
import React,{ useEffect, useState,useContext } from 'react'
import { Grid } from "@gravity-ui/page-constructor";
import { AxiosService } from '@/app/components/axiosService'
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import Imagesignatory_signature_url  from "./Imagesignatory_signature_url";
import TextInputsignatory_name  from "./TextInputsignatory_name";
import TextInputsignatory_resignation  from "./TextInputsignatory_resignation";
import Imagesignatory_signature_url1  from "./Imagesignatory_signature_url1";
import TextInputsignatory_name1  from "./TextInputsignatory_name1";
import TextInputsignatory_resignation1  from "./TextInputsignatory_resignation1";
import { useInfoMsg } from '@/app/torusStaticHandlers/infoMsgHandler';
import { getCookie } from "@/app/components/cookieMgment"
import { TotalContext, TotalContextProps } from '@/app/globalContext';


const SignatoryList = ({lockedData,setLockedData,primaryTableData, setPrimaryTableData,/*Instruction_verificationData, setInstruction_verificationData,Signatory_listData, setSignatory_listData,*/checkToAdd,setCheckToAdd,refetch,
  setRefetch,dropdownData,setDropdownData}:any) => {
  const token:string = getCookie('token')
  const [allowedComponent,setAllowedComponent]=useState<any>("")
  const toast=useInfoMsg()
  const baseUrl:any = process.env.NEXT_PUBLIC_API_BASE_URL;
      const {Instruction_verification10e47, setInstruction_verification10e47} = useContext(TotalContext) as TotalContextProps
      const {Signatory_list7d3b5, setSignatory_list7d3b5} = useContext(TotalContext) as TotalContextProps
  async function securityCheck() {
    const uf_authorizationCheckBody:uf_authorizationCheckDto={key:'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1',nodeName:'Signatory_list',}
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
      key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1',
      group: 'Signatory_list'
    })
  
    if (code?.data?.error == true) { 
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    }else{      
        let codeStates: any = {}      
              codeStates['Instruction_verification'] = Instruction_verification10e47; 
              codeStates['setInstruction_verification'] = setInstruction_verification10e47
              codeStates['Signatory_list'] = Signatory_list7d3b5; 
              codeStates['setSignatory_list'] = setSignatory_list7d3b5
   
        codeExecution(code.data,codeStates)
    }
  }
  useEffect(() => {    
    securityCheck()   
  }, [])
  return (
    <div className="col-start-8 col-end-13 row-start-2 row-end-7 gap-10px border border-slate-300 p-2 rounded-md">
      <Grid containerClass='grid grid-cols-12 gap-2 '>
        {allowedComponent.includes("signatory_signature_url")|| allowedComponent.includes("ALL") ? <Imagesignatory_signature_url   /> : <div></div>}
        {allowedComponent.includes("signatory_name")|| allowedComponent.includes("ALL")  ? <TextInputsignatory_name   /* 21824 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
        {allowedComponent.includes("signatory_resignation")|| allowedComponent.includes("ALL")  ? <TextInputsignatory_resignation   /* f0be2 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
        {allowedComponent.includes("signatory_signature_url1")|| allowedComponent.includes("ALL") ? <Imagesignatory_signature_url1   /> : <div></div>}
        {allowedComponent.includes("signatory_name1")|| allowedComponent.includes("ALL")  ? <TextInputsignatory_name1   /* f634b */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
        {allowedComponent.includes("signatory_resignation1")|| allowedComponent.includes("ALL")  ? <TextInputsignatory_resignation1   /* e8dd9 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
      </Grid>
    </div>             
  )
}

export default SignatoryList