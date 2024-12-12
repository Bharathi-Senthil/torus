'use client'
import React, { useEffect } from 'react' 
import { AxiosService } from "@/app/components/axiosService";
import { Label } from '@gravity-ui/uikit';
import { codeExecution } from '@/app/utils/codeExecution';
const LabelBankDetails = ({Instruction_verificationData, setInstruction_verificationData,Signatory_listData, setSignatory_listData,}:any) => {

const handleCode=async () => {
  const code = await AxiosService.post('/UF/code', {
    key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1',
    group: 'Instruction_verification',
    control:"BankDetails"
  })
  if (code?.data?.error == true) {
    //toast(code?.data?.errorDetails?.message, 'danger')
    //return
  }  else if (code?.data != '') {
      let codeStates: any = {}

      codeStates['Instruction_verification'] =  Instruction_verificationData;

      codeStates['setInstruction_verification'] = setInstruction_verificationData;

      codeStates['Signatory_list'] =  Signatory_listData;

      codeStates['setSignatory_list'] = setSignatory_listData;
    codeExecution(code.data,codeStates)
  }
}

useEffect(() => {
  handleCode()
}, [])

  return (
    <div className="col-start-1 col-end-5 row-start-3 row-end-4 gap-" >
      <Label 
      >
      Bank Details
      </Label>
    </div>
  )
}
export default LabelBankDetails