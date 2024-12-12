'use client'
import React, { useEffect } from 'react' 
import { AxiosService } from "@/app/components/axiosService";
import { Label } from '@gravity-ui/uikit';
import { codeExecution } from '@/app/utils/codeExecution';
const Labelcontent = ({display_cardData, setdisplay_cardData,tableData, settableData,}:any) => {

const handleCode=async () => {
  const code = await AxiosService.post('/UF/code', {
    key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1',
    group: 'display_card',
    control:"content"
  })
  if (code?.data?.error == true) {
    //toast(code?.data?.errorDetails?.message, 'danger')
    //return
  }  else if (code?.data != '') {
      let codeStates: any = {}

      codeStates['display_card'] =  display_cardData;

      codeStates['setdisplay_card'] = setdisplay_cardData;

      codeStates['table'] =  tableData;

      codeStates['settable'] = settableData;
    codeExecution(code.data,codeStates)
  }
}

useEffect(() => {
  handleCode()
}, [])

  return (
    <div className="col-start-1 col-end-6 row-start-1 row-end-3 gap-10px" >
      <Label 
      size="m"
      >
      Pending Draw Instructions(In last  30 days)
      </Label>
    </div>
  )
}
export default Labelcontent