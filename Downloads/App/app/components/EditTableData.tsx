'use client'
import React from 'react'
import { Button, Col, Modal, Row, TextInput } from '@gravity-ui/uikit'
import { PencilToLine } from '@gravity-ui/icons'
import { Grid } from '@gravity-ui/page-constructor'
import axios from 'axios'
import { useInfoMsg } from '@/app/torusStaticHandlers/infoMsgHandler'
import { te_updateDto } from '../interfaces/interfaces'

const EditData = ({ Columns, values,setRefetch }: any) => {
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState(values)
  const cookies = document.cookie.split(';')
  const upId = cookies.find(Cookie => Cookie.trim().startsWith('upId='))
  const upIdValue: string | any = upId?.split('=')[1]
  const dfKey= cookies.find(Cookie => Cookie.trim().startsWith('dfKey='))
  const dfKeyValue: string | any = dfKey?.split('=')[1]
  const token = cookies.find(Cookie =>Cookie.trim().startsWith('token='))
  const tokenValue: string | any = token?.split('=')[1]
  const toast = useInfoMsg()
  const [editedData, setEditedData] = React.useState<any>({})
    const handleChange = (e: any, type: string) => {
      if (type == 'number') {
        setData((prev: any) => ({ ...prev, [e.target.name]: +e.target.value }))
        setEditedData((prev: any) => ({
          ...prev,
          [e.target.name]: +e.target.value
        }))
      } else if (type == 'text') {
        setData((prev: any) => ({ ...prev, [e.target.name]: e.target.value }))
        setEditedData((prev: any) => ({
          ...prev,
          [e.target.name]: e.target.value
        }))
      }
    }
  
  const handleSave = async () => {
    const te_updateBody:te_updateDto={
      data: editedData,
      key: dfKeyValue,
      upId: upIdValue,
      tableName : 'withdraw_instructions',
      param :values.instruction_id
    }

    const te_update:any= await axios.post('http://localhost:3002/handler/update',te_updateBody,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenValue}`
      }
    })
    if(te_update?.data?.error == true){
      toast(te_update?.data?.errorDetails?.message, 'danger')
      return
    }
    if(te_update?.data?.upid){
    setRefetch((pre:any)=>!pre)
    setOpen(false)
    }
  }

  const handleClear = () => {
    let keys: any = {}
    Columns.map((item: any) => {
      keys[item.id] = ''
    })
    setData(keys)
    setEditedData(keys)
  }

  return (
    <div>
      <PencilToLine onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => {
          setOpen(false), setData(values)
        }}>
        <div className='w-full gap-4 p-6'>
          <Row
            space={{ s: '4', m: '4', l: '4', xl: '4' }}
            spaceRow={{ s: '4', m: '4', l: '4', xl: '4' }}
          >
            {Columns &&
              Columns.map((key: any,index:any) => {
                return (
                  <Col s='6' m='6' l='6' xl='6'  key={index}>
                      <TextInput
                        label={key.header}
                        name={key.id}
                        onChange={e => handleChange(e, key.type)}
                        id={key.id}
                        type={key.type}
                        value={data[key.id]}
                        hasClear
                      />
                  </Col>
                )
              })}
          </Row>
          <div className='flex justify-end gap-4 p-4'>
            <Button onClick={handleClear}>Clear</Button>
            <Button
              onClick={() => {
                setOpen(false), setData(values)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default EditData
