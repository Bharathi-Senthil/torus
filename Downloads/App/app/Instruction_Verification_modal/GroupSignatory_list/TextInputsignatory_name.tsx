'use client'
import React, { useState,useContext,useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext';
import { Container,TextInput,Button,Label } from "@gravity-ui/uikit";
import i18n from '@/app/components/i18n';
import { codeExecution } from '@/app/utils/codeExecution';
import { AxiosService } from '@/app/components/axiosService';


const TextInputsignatory_name = ({checkToAdd,setCheckToAdd,refetch,setRefetch}:any) => {
  const {disableParam, setDisableParam} = useContext(TotalContext) as TotalContextProps
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
      const {Instruction_verification10e47, setInstruction_verification10e47} = useContext(TotalContext) as TotalContextProps
      const {Signatory_list7d3b5, setSignatory_list7d3b5} = useContext(TotalContext) as TotalContextProps
    const handleChange = (e: any) => {
             setSignatory_list7d3b5((prev: any) => ({ ...prev, signatory_name: e.target.value }))


    }
    if(Signatory_list7d3b5?.signatory_name){
      let update=(e:any)=>{
               setSignatory_list7d3b5((prev: any) => ({ ...prev, signatory_name: e.target.value }))
      }
    }
  
  const handleBlur=async (e:any) => {
    const code = await AxiosService.post('/UF/code', {
      key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1',
      group: 'Signatory_list',
      control:"signatory_name"
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

  const keyset:any=i18n.keyset("language")   

  const handleMapperValue=async()=>{
   let getMapperDetailsBody:any={
      ufkey:"CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1",
      componentName:"Signatory_list",
      controlName:"signatory_name",
    }
    try{
     let getMapperDetails:any =  await AxiosService.post("/UF/getMapperDetails",getMapperDetailsBody,{
        headers: {
          'Content-Type': 'application/json'
        },
      }
      )
      if(getMapperDetails?.data?.error == true){
       
        return
      }
      if(Array.isArray(getMapperDetails?.data))
      {
        let filteredData = getMapperDetails?.data.filter((item:any) => globalState?.client_id === item?.client_id);
        if(filteredData.length){
          
          setSignatory_list7d3b5((pre:any)=>({...pre,signatory_name:filteredData[0]?.signatory_name}))
        }
        return
      }else{
        setSignatory_list7d3b5((pre:any)=>({...pre,signatory_name:getMapperDetails?.data}))
      }
    }
    catch(err)
    {
      console.log(err)
    }
  }
 
    useEffect(()=>{
      handleMapperValue()
     
    },[])

  return (   
    <div className="col-start-5 col-end-10 row-start-3 row-end-4 gap-10px" >
      <TextInput
        label={keyset("")}
        onChange= {handleChange}
        onBlur={handleBlur}
        type="text"
        value={Signatory_list7d3b5?.signatory_name||""}
      
      />
    </div>
        
  )
}
export default TextInputsignatory_name