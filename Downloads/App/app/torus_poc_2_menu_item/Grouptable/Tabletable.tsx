"use client"

import { Pagination, PaginationProps } from '@gravity-ui/uikit'
import TableTopContent from '@/app/components/TableTopContent'
import { useRouter } from 'next/navigation'



import { TotalContext, TotalContextProps } from '@/app/globalContext'
import {
  Col,
  Flex,
  Row,
  Table,
  TableDataItem,
  TableProps,
  withTableSettings,
  WithTableSettingsProps,
  withTableSorting,
  withTableSelection,
  WithTableSelectionProps,
  RenderRowActionsProps,
  withTableActions,
  WithTableActionsProps
} from '@gravity-ui/uikit'
import React, { useEffect, useState,useContext } from 'react'
import { AxiosService } from '@/app/components/axiosService'
import { useInfoMsg } from '@/app/torusStaticHandlers/infoMsgHandler'
import { getCookie } from "@/app/components/cookieMgment"
import { nullFilter } from '@/app/utils/nullDataFilter';
import { codeExecution } from '@/app/utils/codeExecution'
import { uf_fetchActionDetailsDto,uf_fetchRuleDetailsDto,te_refreshDto,api_paginationDto,uf_paginationDataFilterDto } from '@/app/interfaces/interfaces';
const MyTable: React.ComponentType<
  TableProps<TableDataItem> &
   
    WithTableActionsProps<TableDataItem>|any
> =
(
  withTableSorting(
  (withTableActions(Table)))
)
let defaultColumns = 
[
  {
    "id": "client_name",
    "name": "Client Name",
    "type": "text",
    "meta": {
      "sort": true
    }
  },
  {
    "id": "requested_date",
    "name": "Requested Date",
    "type": "date",
    "meta": {
      "sort": true
    }
  },
  {
    "id": "instruction_id",
    "name": "Instruction ID",
    "type": "number",
    "meta": {
      "sort": true
    }
  },
  {
    "id": "withdraw_amount",
    "name": "Withdraw Amount",
    "type": "number",
    "meta": {
      "sort": true
    }
  },
  {
    "id": "disbursement_date",
    "name": "Disbursement Date",
    "type": "date",
    "meta": {
      "sort": true
    }
  },
  {
    "id": "instruction_detail",
    "name": "Instruction Detail",
    "type": "text",
    "meta": {
      "sort": true
    }
  },
  {
    "id": "client_id",
    "name": "client id",
    "type": "number",
    "meta": {
      "sort": true
    }
  }
] ;
for (let i = 0; i < defaultColumns.length; i++) {
  defaultColumns[i].id = defaultColumns[i].id.toLowerCase();
}

const Tabletable=({ /*display_cardData, setdisplay_cardData,tableData, settableData,*/lockedData,setLockedData,primaryTableData, setPrimaryTableData,refetch, setRefetch,setData }: any)=>{
const upId: string | any = getCookie('upId')
let dfKey: string | any
const toast =useInfoMsg()
const token: string | any = getCookie('token')
    const {display_card15add, setdisplay_card15add} = useContext(TotalContext) as TotalContextProps
    const {table7b723, settable7b723} = useContext(TotalContext) as TotalContextProps
const {globalState , setGlobalState} = useContext(TotalContext) as TotalContextProps
const [paginationData, setPaginationData] = React.useState({
  page: 0,
  pageSize: 0,
  total: 0
})
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [selectedPaginationData, setSelectedPaginationData] = useState<any[]>(
      []
    )
  const [settings, setSettings] = useState<any>();
    
  /*const [paginationData, setPaginationData] = React.useState({
    page: 0,
    pageSize: 0,
    total: 0
  })*/
  async function fetchNeedLocking() {

    const uf_fetchActionDetailsBody:uf_fetchActionDetailsDto={
      key:'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1',
      groupName:'table',
      controlName:'table'
    }
    const uf_fetchActionDetails=await AxiosService.post("/UF/fetchActionDetails",uf_fetchActionDetailsBody)
    if(uf_fetchActionDetails?.data?.error == true){
      toast(uf_fetchActionDetails?.data?.errorDetails?.message, 'danger')
      return
    }
    if(uf_fetchActionDetails?.data){
      if (
        uf_fetchActionDetails?.data?.paginationDetails?.count &&
        uf_fetchActionDetails?.data?.paginationDetails?.page
      ){
        setPaginationData(
          { ...paginationData, 
            pageSize: +uf_fetchActionDetails?.data?.paginationDetails?.count,
            page: +uf_fetchActionDetails?.data?.paginationDetails?.page
          })
        fetchData(+uf_fetchActionDetails?.data?.paginationDetails?.page,+uf_fetchActionDetails?.data?.paginationDetails?.count)
      }
    }
  }
  useEffect(()=>{
    fetchNeedLocking()
  },[])
  const handleUpdate: PaginationProps['onUpdate'] = (page, pageSize) =>{
    setSelectedIds([])
    let checkedData: any = selectedPaginationData
    if (checkedData.length) {
      for (let i = 0; i < checkedData.length; i++) {
        if (checkedData[i].page == page) {
          setSelectedIds(checkedData[i].data)
        }
      }
    }
    setPaginationData(prevState => ({ ...prevState, page, pageSize }))
    fetchData(page, pageSize)
  }
  const [filterValue, setFilterValue] = useState('')
  const [filterColumn, setFilterColumn] = useState(defaultColumns[0].id)
  async function onSelectionChange(e:any) {
    }
  async function fetchData(page = 1, pageSize = 10) {
    try {
        const uf_dfKey = await AxiosService.get(
          "/UF/dfKey?ufKey=CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1&groupName=table",
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
        if(uf_dfKey?.data?.error == true){
          toast(uf_dfKey?.data?.errorDetails?.message, 'danger')
            return
        }
        dfKey = uf_dfKey?.data

      let te_refreshBody:te_refreshDto = {
      key : dfKey,
      upId : upId
      }
      const te_refresh:any= await AxiosService.post("/te/refresh", te_refreshBody, {
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        }
      })
      if(te_refresh?.data?.error == true){
        toast(te_refresh?.data?.errorDetails?.message, 'danger')
        return
      }
      let dstKey:any=dfKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
      let keyWithP:any=dfKey;

      const uf_fetchRuleDetailsBody:uf_fetchRuleDetailsDto={
        key:'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1',
        groupName:'table',
        controlName:'table'
      }
      const uf_fetchRuleDetails=await AxiosService.post("/UF/fetchRuleDetails",uf_fetchRuleDetailsBody)
      if(uf_fetchRuleDetails?.data?.error == true){
        toast(uf_fetchRuleDetails?.data?.errorDetails?.message, 'danger')
        return
      }
      let api_pagination:any
      if(typeof uf_fetchRuleDetails.data === 'string'){
        const api_paginationBody:api_paginationDto = {
          key: dstKey,
          page:page,
          count:pageSize,
         
        }
        api_pagination = await AxiosService.post("/api/pagination",api_paginationBody )
        if(api_pagination?.data?.error == true){
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        setPaginationData(prevState => ({ ...prevState, total: api_pagination.data.totalRecords }))
      }else {
        const api_paginationBody:api_paginationDto = {
          key: dstKey,
          page:page,
          count:pageSize,
          filterDetails: {
            ufKey:'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1:UO', 
            nodeName: 'table',
            elementName: 'table'
          }
        }
        api_pagination = await AxiosService.post("/api/pagination",api_paginationBody )
        if(api_pagination?.data?.error == true){
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        setPaginationData(prevState => ({ ...prevState, total: api_pagination.data.totalRecords }))
      }
      const uf_paginationDataFilterBody:uf_paginationDataFilterDto={
        data: api_pagination.data.records,
        key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1',
      }
      const uf_paginationDataFilter = await AxiosService.post(
        "/UF/PaginationDataFilter",
        uf_paginationDataFilterBody
      )
      if(uf_paginationDataFilter?.data?.error == true){
        toast(uf_paginationDataFilter?.data?.errorDetails?.message, 'danger')
        return
      }
      if (uf_paginationDataFilter.data.length <= 0) {
          settable7b723([])
          return
        }
        const code = await AxiosService.post('/UF/code', {
          key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1',
          group: 'table'
        })
        if (code?.data?.error == true) {          
          settable7b723(uf_paginationDataFilter.data)
 
          //toast(code?.data?.errorDetails?.message, 'danger')
          //return
        } else {
          if (uf_paginationDataFilter.data.length <= 0) {
            settable7b723([])
            return
          }
          else if (code?.data != '') {
            let codeStates: any = {}
                codeStates['display_card']  = display_card15add,
                codeStates['setdisplay_card'] = setdisplay_card15add,
                codeStates['table']  =uf_paginationDataFilter.data
                codeStates['settable'] = settable7b723,
          codeExecution(code.data,codeStates)
          }
          else {
            settable7b723(uf_paginationDataFilter.data)
          }
        }
      } catch (err:any) { 
        toast(err?.response?.data?.errorDetails?.message, 'danger')
      }
    }

  // useEffect(() => {
  // fetchData()
  // }, [])
  useEffect(() => {
    if(paginationData.page != 0 && paginationData.pageSize != 0)
      fetchData(paginationData.page , paginationData.pageSize)
    setSelectedIds([])
    setSelectedPaginationData([])
  }, [refetch])
  const [columns, setColumns] = useState<any>([])

  const onSearch = async (page = 1, pageSize = 10) => {
    try {
      let te_refreshBody:te_refreshDto = {
      key : dfKey,
      upId : upId
      }
      const te_refresh:any= await AxiosService.post("/te/refresh", te_refreshBody, {
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`
        }
      })
      if(te_refresh?.data?.error == true){
        toast(te_refresh?.data?.errorDetails?.message, 'danger')
        return
      }
      let dstKey:any=dfKey.replace(":AFC:",":AFCP:").replace(":AF:",":AFP:").replace(":DF-DFD:",":DF-DST:");
      let keyWithP:any=dfKey;

      const uf_fetchRuleDetailsBody:uf_fetchRuleDetailsDto={
        key:'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1',
        groupName:'table',
        controlName:'table'
      }
      const uf_fetchRuleDetails=await AxiosService.post("/UF/fetchRuleDetails",uf_fetchRuleDetailsBody)
      if(uf_fetchRuleDetails?.data?.error == true){
        toast(uf_fetchRuleDetails?.data?.errorDetails?.message, 'danger')
        return
      }
      let api_pagination:any
      if(typeof uf_fetchRuleDetails.data === 'string'){
        const api_paginationBody:api_paginationDto = {
          key: dstKey,
          page:page,
          count:pageSize,
         
        }
        api_pagination = await AxiosService.post("/api/pagination",api_paginationBody )
        if(api_pagination?.data?.error == true){
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        setPaginationData(prevState => ({ ...prevState, total: api_pagination.data.totalRecords }))
      }else {
        const api_paginationBody:api_paginationDto = {
          key: dstKey,
          page:page,
          count:pageSize,
          filterDetails: {
            ufKey:'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1:UO', 
            nodeName: 'table',
            elementName: 'table'
          }
        }
        api_pagination = await AxiosService.post("/api/pagination",api_paginationBody )
        if(api_pagination?.data?.error == true){
          toast(api_pagination?.data?.errorDetails?.message, 'danger')
          return
        }
        setPaginationData(prevState => ({ ...prevState, total: api_pagination.data.totalRecords }))
      }
    const uf_paginationDataFilterBody:uf_paginationDataFilterDto={
      data: api_pagination.data.records,
      key: 'CK:TT108:FNGK:AFC:FNK:UF-UFD:CATK:ABC001:AFGK:ABC100:AFK:withdraw_instruction:AFVK:v1',
    }
    const uf_paginationDataFilter = await AxiosService.post(
      "/UF/PaginationDataFilter",
      uf_paginationDataFilterBody
    )
    if(uf_paginationDataFilter?.data?.error == true){
      toast(uf_paginationDataFilter?.data?.errorDetails?.message, 'danger')
      return
    }
    let searchData:any=[]
    defaultColumns.map((item:any)=>{
      if(item.id==filterColumn && item.type=='text'){
        searchData = uf_paginationDataFilter.data.filter((item: any) => {
          if (item[filterColumn].startsWith(filterValue)) return item
        })
      }
      if(item.id==filterColumn && item.type=='number'){
        searchData = uf_paginationDataFilter.data.filter((item: any) => {
          if (item[filterColumn]==+filterValue) return item
        })
      }
    })
    

    settable7b723(searchData)
    } catch (err:any) { 
      toast(err?.response?.data?.errorDetails?.message, 'danger')
    }
  }

  const handlePrimaryTable = () => {
    let findData = selectedIds[selectedIds.length - 1]

    let data = table7b723[findData]
    console.log(data)

    setPrimaryTableData({
      ...primaryTableData,
      primaryKey: "instruction_id",
      value: data["instruction_id"],
      parentData: data
    })
  }
  const routes=useRouter()
  const handleRoute=(data:any)=>{
        let temp={
          client_id:data["client_id"]
        }

        setGlobalState({...globalState,...temp})
      // showProfile 
    routes.push("/Instruction_Verification_modal")
  }
  useEffect(() => {
    if (selectedIds.length != 0) handlePrimaryTable()
  }, [selectedIds])
  return(
    <div className="col-start-1 col-end-13 row-start-3 row-end-7 gap-10px">
        <Row space={3}>
            <Col>
                <Flex direction='column' >
                  <TableTopContent
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    columns={defaultColumns}
                    filterColumn={filterColumn}
                    setFilterColumn={setFilterColumn}
                    paginationData={paginationData}
                    onSearch={onSearch}
                  />
                  <MyTable
                    data={Array.isArray(table7b723) ? table7b723 : []}
                    columns={defaultColumns}
                    edgePadding={true}
                    selectedIds={selectedIds}  
                      onSelectionChange={setSelectedIds} 
                    settings={settings}
                    updateSettings={setSettings}
                      onRowClick={handleRoute}           

                  />
                    <Pagination
                    className='flex w-full items-center justify-center'
                    page={paginationData.page}
                    pageSize={paginationData.pageSize}
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                    total={paginationData.total}
                    onUpdate={handleUpdate}
                    showInput={true}
                    size='l'
                  />
                </Flex>
            </Col>
        </Row>
    </div>
  )
}
export default Tabletable