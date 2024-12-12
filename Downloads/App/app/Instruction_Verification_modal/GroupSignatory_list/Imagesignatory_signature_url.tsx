'use client'
import Image from 'next/image';
import React, { useState,useContext,useEffect } from 'react'
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

const Imagesignatory_signature_url =  () => {
  const {disableParam, setDisableParam} = useContext(TotalContext) as TotalContextProps
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
      const {Instruction_verification10e47, setInstruction_verification10e47} = useContext(TotalContext) as TotalContextProps
      const {Signatory_list7d3b5, setSignatory_list7d3b5} = useContext(TotalContext) as TotalContextProps
  const handleMapperValue=async()=>{
        let getMapperDetailsBody:any={
          ufkey:"CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1",
          componentName:"Signatory_list",
          controlName:"signatory_signature_url",
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
              
              setSignatory_list7d3b5((pre:any)=>({...pre,signatory_signature_url:filteredData[0]?.signatory_signature_url}))
            }
            else {
              
              setSignatory_list7d3b5((pre:any)=>({...pre,signatory_signature_url:""}))
            }
            return
          }else{
            setSignatory_list7d3b5((pre:any)=>({...pre,signatory_signature_url:getMapperDetails?.data}))
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
    <div className="col-start-5 col-end-10 row-start-1 row-end-2 gap-10px" >
      <div>{Signatory_list7d3b5?.signatory_signature_url==""||Signatory_list7d3b5?.signatory_signature_url==undefined?
        <img
          src={Signatory_list7d3b5?.signatory_signature_url||""}
        alt={" no image found"}
      />
      :
      <img
          src={Signatory_list7d3b5?.signatory_signature_url||""}
        alt={"signatory_signature_url"}
      />
        }
          
        </div>
    </div>
  )
}
export default Imagesignatory_signature_url

