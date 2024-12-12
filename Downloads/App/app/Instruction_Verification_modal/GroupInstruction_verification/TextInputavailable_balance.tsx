'use client'
import React, { useState, useContext, useEffect } from 'react'
import { TotalContext, TotalContextProps } from '@/app/globalContext'
import { Container, TextInput, Button, Label } from '@gravity-ui/uikit'
import i18n from '@/app/components/i18n'
import { codeExecution } from '@/app/utils/codeExecution'
import { AxiosService } from '@/app/components/axiosService'

const TextInputavailable_balance = ({
  checkToAdd,
  setCheckToAdd,
  refetch,
  setRefetch
}: any) => {
  const { disableParam, setDisableParam } = useContext(
    TotalContext
  ) as TotalContextProps
  const { globalState, setGlobalState } = useContext(
    TotalContext
  ) as TotalContextProps
  const { Instruction_verification10e47, setInstruction_verification10e47 } =
    useContext(TotalContext) as TotalContextProps
  const { Signatory_list7d3b5, setSignatory_list7d3b5 } = useContext(
    TotalContext
  ) as TotalContextProps
  const handleChange = (e: any) => {
    setInstruction_verification10e47((prev: any) => ({
      ...prev,
      available_balance: +e.target.value
    }))
  }
  if (Instruction_verification10e47?.available_balance) {
    let update = (e: any) => {
      setInstruction_verification10e47((prev: any) => ({
        ...prev,
        available_balance: +e.target.value
      }))
    }
  }

  const handleBlur = async (e: any) => {
    const code = await AxiosService.post('/UF/code', {
      key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1',
      group: 'Instruction_verification',
      control: 'available_balance'
    })
    if (code?.data?.error == true) {
      //toast(code?.data?.errorDetails?.message, 'danger')
      //return
    } else if (code?.data != '') {
      let codeStates: any = {}
      ;(codeStates['Instruction_verification'] = Instruction_verification10e47),
        (codeStates['setInstruction_verification'] =
          setInstruction_verification10e47),
        (codeStates['Signatory_list'] = Signatory_list7d3b5),
        (codeStates['setSignatory_list'] = setSignatory_list7d3b5),
        /*
      codeStates['Instruction_verification'] =  Instruction_verificationData;      
      codeStates['setInstruction_verification'] = setInstruction_verificationData;

      codeStates['Signatory_list'] =  Signatory_listData;      
      codeStates['setSignatory_list'] = setSignatory_listData;
*/
        codeExecution(code.data, codeStates)
    }
  }

  const keyset: any = i18n.keyset('language')

  const handleMapperValue = async () => {
    let getMapperDetailsBody: any = {
      ufkey:
        'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:Instruction_Verification_modal:AFVK:v1',
      componentName: 'Instruction_verification',
      controlName: 'available_balance'
    }
    try {
      let getMapperDetails: any = await AxiosService.post(
        '/UF/getMapperDetails',
        getMapperDetailsBody,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (getMapperDetails?.data?.error == true) {
        return
      }
      if (Array.isArray(getMapperDetails?.data)) {
        let filteredData = getMapperDetails?.data.filter(
          (item: any) => globalState?.client_id === item?.client_id
        )
        if (filteredData.length) {
          setInstruction_verification10e47((pre: any) => ({
            ...pre,
            available_balance: filteredData[0]?.available_balance
          }))
        }
        return
      } else {
        setInstruction_verification10e47((pre: any) => ({
          ...pre,
          available_balance: getMapperDetails?.data
        }))
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleMapperValue()
  }, [])

  return (
    <div className='gap- col-start-5 col-end-8 row-start-2 row-end-3'>
      <Label theme='clear'>{keyset('Available Balance')}</Label>
      <TextInput
        onChange={handleChange}
        onBlur={handleBlur}
        type='number'
        value={Instruction_verification10e47?.available_balance || ''}
        view='clear'
        readOnly={true}
      />
    </div>
  )
}
export default TextInputavailable_balance
