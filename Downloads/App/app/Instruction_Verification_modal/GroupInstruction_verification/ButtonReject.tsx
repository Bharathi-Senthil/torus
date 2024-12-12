'use client'
import React, { useState,useContext } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation'
import {Button,Container} from '@gravity-ui/uikit';
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution'
import { useInfoMsg } from '@/app/torusStaticHandlers/infoMsgHandler';
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { uf_getPFDetailsDto,uf_initiatePfDto,te_eventEmitterDto,uf_ifoDto,te_updateDto } from '@/app/interfaces/interfaces';
import decodeToken from '@/app/components/decodeToken';
import { AxiosService } from '@/app/components/axiosService';
import { getCookie } from '@/app/components/cookieMgment';
import { nullFilter } from '@/app/utils/nullDataFilter';



function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => {
      // Determine the modifier based on the type of the value
      const value = obj[key];
      let modifiedKey = key;

      if (typeof value === 'string') {
        modifiedKey += '-contains';  // Append '-contains' if value is a string
      } else if (typeof value === 'number') {
        modifiedKey += '-equals';    // Append '-equals' if value is a number
      }

      // Return the key-value pair with the modified key
      return `${encodeURIComponent(modifiedKey)}=${encodeURIComponent(value)}`;
    })
    .join('&');
}
 

const ButtonReject =  ({ /*Instruction_verificationData, setInstruction_verificationData,Signatory_listData, setSignatory_listData,*/lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch}: { lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,/*Instruction_verificationData:any, setInstruction_verificationData:any,Signatory_listData:any, setSignatory_listData:any,*/}) => {
  const keyset:any=i18n.keyset("language")
  const toast:any=useInfoMsg()
  const [open, setOpen] = React.useState(false);
  const {disableParam, setDisableParam} = useContext(TotalContext) as TotalContextProps
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
    const {Instruction_verification10e47, setInstruction_verification10e47} = useContext(TotalContext) as TotalContextProps
    const {Signatory_list7d3b5, setSignatory_list7d3b5} = useContext(TotalContext) as TotalContextProps
  const handleClick = async() => {
    const code = await AxiosService.post('/UF/code', {
      key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1',
      group: 'Instruction_verification',
      control:"Reject"
    })
    if (code?.data?.error == true) {
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    }  else if (code?.data != '') {
        let codeStates: any = {}
            codeStates['Instruction_verification']  = Instruction_verification10e47,
            codeStates['setInstruction_verification'] = setInstruction_verification10e47,
            codeStates['Signatory_list']  = Signatory_list7d3b5,
            codeStates['setSignatory_list'] = setSignatory_list7d3b5,
        /*
        codeStates['Instruction_verification'] =  Instruction_verificationData;

        codeStates['setInstruction_verification'] = setInstruction_verificationData;

        codeStates['Signatory_list'] =  Signatory_listData;

        codeStates['setSignatory_list'] = setSignatory_listData;
*/

      codeExecution(code.data,codeStates)
      }
  }
  return (
    <div className="col-start-4 col-end-6 row-start-10 row-end-11 gap-10px" >
        <Button 
          className="w-full"
          onClick={handleClick}
          
          view='flat-danger'
        >
          {keyset("Reject")}
        </Button>
    </div>
  )
}
export default ButtonReject

