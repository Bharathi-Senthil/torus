'use client'
import React,{ useEffect, useState,useContext } from 'react'
import { Grid } from "@gravity-ui/page-constructor";
import { AxiosService } from '@/app/components/axiosService'
import { uf_authorizationCheckDto } from '@/app/interfaces/interfaces';
import { codeExecution } from '@/app/utils/codeExecution';
import LabelAmountDetails  from "./LabelAmountDetails";
import LabelBankDetails  from "./LabelBankDetails";
import LabelWithdrawalInstruction  from "./LabelWithdrawalInstruction";
import LabelOperationUserComments  from "./LabelOperationUserComments";
import TextInputwithdraw_amount  from "./TextInputwithdraw_amount";
import TextInputavailable_balance  from "./TextInputavailable_balance";
import TextInputaccount_number  from "./TextInputaccount_number";
import TextInputaccount_name  from "./TextInputaccount_name";
import TextInputbank_identifiaction_number  from "./TextInputbank_identifiaction_number";
import TextInputinstruction_detail  from "./TextInputinstruction_detail";
import TextInputdisbursement_date  from "./TextInputdisbursement_date";
import TextInputinstruction_letter_url  from "./TextInputinstruction_letter_url";
import ButtonAccept  from "./ButtonAccept";
import ButtonReject  from "./ButtonReject";
import { useInfoMsg } from '@/app/torusStaticHandlers/infoMsgHandler';
import { getCookie } from "@/app/components/cookieMgment"
import { TotalContext, TotalContextProps } from '@/app/globalContext';


const InstructionVerification = ({lockedData,setLockedData,primaryTableData, setPrimaryTableData,/*Instruction_verificationData, setInstruction_verificationData,Signatory_listData, setSignatory_listData,*/checkToAdd,setCheckToAdd,refetch,
  setRefetch,dropdownData,setDropdownData}:any) => {
  const token:string = getCookie('token')
  const [allowedComponent,setAllowedComponent]=useState<any>("")
  const toast=useInfoMsg()
  const baseUrl:any = process.env.NEXT_PUBLIC_API_BASE_URL;
      const {Instruction_verification10e47, setInstruction_verification10e47} = useContext(TotalContext) as TotalContextProps
      const {Signatory_list7d3b5, setSignatory_list7d3b5} = useContext(TotalContext) as TotalContextProps
  async function securityCheck() {
    const uf_authorizationCheckBody:uf_authorizationCheckDto={key:'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1',nodeName:'Instruction_verification',}
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
      group: 'Instruction_verification'
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
    <div className="col-start-1 col-end-8 row-start-2 row-end-7 gap-10px border border-slate-300 p-2 rounded-md">
      <Grid containerClass='grid grid-cols-12 gap-2 '>
        {allowedComponent.includes("amountdetails")|| allowedComponent.includes("ALL") ? <LabelAmountDetails   /* 18827 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} /> : <div></div>}
        {allowedComponent.includes("bankdetails")|| allowedComponent.includes("ALL") ? <LabelBankDetails   /* 914c8 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} /> : <div></div>}
        {allowedComponent.includes("withdrawalinstruction")|| allowedComponent.includes("ALL") ? <LabelWithdrawalInstruction   /* cdeb1 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} /> : <div></div>}
        {allowedComponent.includes("operationusercomments")|| allowedComponent.includes("ALL") ? <LabelOperationUserComments   /* cd7ec */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} /> : <div></div>}
        {allowedComponent.includes("withdraw_amount")|| allowedComponent.includes("ALL")  ? <TextInputwithdraw_amount   /* 828d9 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
        {allowedComponent.includes("available_balance")|| allowedComponent.includes("ALL")  ? <TextInputavailable_balance   /* e1218 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
        {allowedComponent.includes("account_number")|| allowedComponent.includes("ALL")  ? <TextInputaccount_number   /* 44ae6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
        {allowedComponent.includes("account_name")|| allowedComponent.includes("ALL")  ? <TextInputaccount_name   /* 8494e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
        {allowedComponent.includes("bank_identifiaction_number")|| allowedComponent.includes("ALL")  ? <TextInputbank_identifiaction_number   /* 0ab9e */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
        {allowedComponent.includes("instruction_detail")|| allowedComponent.includes("ALL")  ? <TextInputinstruction_detail   /* 48bb6 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
        {allowedComponent.includes("disbursement_date")|| allowedComponent.includes("ALL")  ? <TextInputdisbursement_date   /* e6716 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
        {allowedComponent.includes("instruction_letter_url")|| allowedComponent.includes("ALL")  ? <TextInputinstruction_letter_url   /* ef4b5 */ checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch} /> : <div></div>}
        {allowedComponent.includes("accept")||  allowedComponent.includes("ALL")  ? <ButtonAccept  /* Instruction_verificationData={ Instruction_verificationData}  setInstruction_verificationData={setInstruction_verificationData} Signatory_listData={ Signatory_listData}  setSignatory_listData={setSignatory_listData}*/lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch}/> : <div></div>}          
        {allowedComponent.includes("reject")||  allowedComponent.includes("ALL")  ? <ButtonReject  /* Instruction_verificationData={ Instruction_verificationData}  setInstruction_verificationData={setInstruction_verificationData} Signatory_listData={ Signatory_listData}  setSignatory_listData={setSignatory_listData}*/lockedData={lockedData} setLockedData={setLockedData} primaryTableData={primaryTableData} setPrimaryTableData={setPrimaryTableData} checkToAdd={checkToAdd} setCheckToAdd={setCheckToAdd} refetch={refetch} setRefetch={setRefetch}/> : <div></div>}          
      </Grid>
    </div>             
  )
}

export default InstructionVerification