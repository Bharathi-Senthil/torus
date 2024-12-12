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
 

const ButtonAccept =  ({ /*Instruction_verificationData, setInstruction_verificationData,Signatory_listData, setSignatory_listData,*/lockedData,setLockedData,primaryTableData, setPrimaryTableData,checkToAdd,setCheckToAdd,refetch,setRefetch}: { lockedData:any,setLockedData:any,checkToAdd:any,setCheckToAdd:any,refetch:any,setRefetch:any,primaryTableData:any,setPrimaryTableData:any,/*Instruction_verificationData:any, setInstruction_verificationData:any,Signatory_listData:any, setSignatory_listData:any,*/}) => {
  const keyset:any=i18n.keyset("language")
  const toast:any=useInfoMsg()
  const [open, setOpen] = React.useState(false);
  const {disableParam, setDisableParam} = useContext(TotalContext) as TotalContextProps
  const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
    const {Instruction_verification10e47, setInstruction_verification10e47} = useContext(TotalContext) as TotalContextProps
    const {Signatory_list7d3b5, setSignatory_list7d3b5} = useContext(TotalContext) as TotalContextProps
      const {table7b723, settable7b723} = useContext(TotalContext) as TotalContextProps
  const token:string = getCookie('token');
  let dfKey: string | any
  const decodedTokenObj:any = decodeToken(token);
  const createdBy:string =decodedTokenObj.users;
  const lockMode:any = lockedData.lockMode;
  const [loading, setLoading] = useState(false)
  const routes = useRouter()
  const sessionInfo:any = {
    accessToken: token,
    authToken: ''
  }
  let event:any
  event= 'onClick'
  const handleClick = async () => {
    let saveCheck=false
    Object.keys(checkToAdd).map((item)=>{
      if(checkToAdd[item] == true){
        saveCheck=true
    }})
    if (saveCheck) {   
      toast('Error found', 'danger')
      return
    }
    try{
      const uf_dfKey = await AxiosService.get(
        "/UF/dfKey?ufKey=CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1&groupName=Instruction_verification",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
      if(uf_dfKey?.data?.error == true || uf_dfKey?.data == ''){
          // toast(uf_dfKey?.data?.errorDetails?.message, 'danger')
          dfKey = getCookie('dfKey')
      }else{

        dfKey = uf_dfKey?.data
      }
      let uf_initiatePf:any
      let te_eventEmitterBody:te_eventEmitterDto
      let primaryKey:any
      let uf_getPFDetails:any
      let uf_ifo:any
      let lockedKeysLength:number
      const uf_getPFDetailsBody:uf_getPFDetailsDto={
        key:"CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1",
        groupName:"Instruction_verification",
        controlName:"Accept",
        isTable:false
      }
      uf_getPFDetails =  await AxiosService.post("/UF/getPFDetails",uf_getPFDetailsBody,{
        headers: {
            'Content-Type': 'application/json'
          },
        }
      )
      if (uf_getPFDetails.data.key != undefined) {
           const uf_initiatePfBody:uf_initiatePfDto={
            key:uf_getPFDetails.data.key,
          }
              uf_initiatePf = await AxiosService.post("/UF/InitiatePF",uf_initiatePfBody,
                { headers: {
                  'Content-Type': 'application/json'
                }, })
                if(uf_initiatePf?.data?.error == true){
                  toast(uf_initiatePf?.data?.errorDetails?.message, 'danger')
                  return
                }
       
      } else {
        uf_initiatePf= {
          data:{
            nodeProperty:'',
            eventProperty:''
          }
        }
      }
      
      let artifactKey:any;
        

        

        

      // updateHandler riseListen
      
      let targetTabName = 'clients'
      let targetprimaryKey = 'client_id'
      let targetStatus = 'accepted'
     // let targetNodeId = ''

     let te_updateBody:any ={};
      te_updateBody.data = [];
      let toUpdatedData = {status:uf_getPFDetails.data.status,'modified_by':createdBy}
      te_updateBody.data.push(toUpdatedData) 
     // if(lockedKeysLength){
     //   for (let i = 0; i < lockedKeysLength; i++) {
     //   te_updateBody.data.push(toUpdatedData)        
     //}
     //}
      //te_updateBody.key = dfKey
     // te_updateBody.upId = lockedData.processIds
      te_updateBody.tableName = 'clients'

      if(Array.isArray(table7b723) )
      {

        te_updateBody.primaryKey = [globalState.client_id]
      }
      else{
        
        te_updateBody.primaryKey = [table7b723.client_id]
      }

    
      te_updateBody.url = process.env.NEXT_PUBLIC_API_URL
      
      const te_update:any =await AxiosService.post("/handler/update",te_updateBody,{
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      

      
        

        

      // refreshHandler
      let body:any={"key":"CK:TT108:FNGK:AFC:FNK:DF-DFD:CATK:ABC001:AFGK:ABC100:AFK:client_db:AFVK:v1:"}
      const te_refresh:any=await AxiosService.post("/te/refresh",body,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      settable7b723({...te_refresh?.data?.dataset?.data[0]})
        

      setRefetch((pre: any) => !pre)
    }catch (err: any) {
      toast(err?.response?.data?.errorDetails?.message, 'danger')
      setLoading(false)
    }
  }
  return (
    <div className="col-start-1 col-end-3 row-start-10 row-end-11 gap-10px" >
                                                        <Button 
          className="w-full"
          onClick={handleClick}
          
          view='flat-success'
        >
          {keyset("Accept")}
        </Button>
    </div>
  )
}
export default ButtonAccept

