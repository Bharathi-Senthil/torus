
"use client"
import React from 'react'

export interface TotalContextProps {
    display_card15add: any 
    setdisplay_card15add: React.Dispatch<React.SetStateAction<any>>
    table7b723: any 
    settable7b723: React.Dispatch<React.SetStateAction<any>>
    Instruction_verification10e47: any 
    setInstruction_verification10e47: React.Dispatch<React.SetStateAction<any>>
    Signatory_list7d3b5: any 
    setSignatory_list7d3b5: React.Dispatch<React.SetStateAction<any>>
    refetch: any,
    setRefetch: React.Dispatch<React.SetStateAction<any>>
    searchParam: string,
    setSearchParam: React.Dispatch<React.SetStateAction<string>>
    disableParam: any,
    setDisableParam: React.Dispatch<React.SetStateAction<any>>
    globalState: any,
    setGlobalState: React.Dispatch<React.SetStateAction<any>>

}

export const TotalContext = React.createContext<TotalContextProps | {}>({})

const GlobalContext = ({children} : {children: React.ReactNode}) => {
        const [display_card15add, setdisplay_card15add ] = React.useState<any>({}) 
    
    const [table7b723, settable7b723 ] = React.useState<any[]>([]) 
        const [Instruction_verification10e47, setInstruction_verification10e47 ] = React.useState<any>({}) 
        const [Signatory_list7d3b5, setSignatory_list7d3b5 ] = React.useState<any>({}) 
    const [searchParam , setSearchParam] = React.useState<string>("")
    const [disableParam , setDisableParam] = React.useState<any>({})
    const [globalState , setGlobalState] = React.useState<any>({})
    const [refetch, setRefetch] = React.useState<any>(false)


  return (
    <TotalContext.Provider value={{display_card15add, setdisplay_card15add,table7b723, settable7b723,Instruction_verification10e47, setInstruction_verification10e47,Signatory_list7d3b5, setSignatory_list7d3b5,refetch, setRefetch,searchParam , setSearchParam,disableParam , setDisableParam,globalState , setGlobalState}}>
      {children}
    </TotalContext.Provider>
  )
}

export default GlobalContext
