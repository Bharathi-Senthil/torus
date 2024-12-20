'use client'
import React from 'react'
import { Button, Col, Modal, Row, TextInput } from '@gravity-ui/uikit'
import { TrashBin } from '@gravity-ui/icons'
const DeleteData = ({ values }: any) => {
  const [open, setOpen] = React.useState(false)
  const handleDelete = () => {
    console.log(values)
  }
  return (
    <div>
      <TrashBin onClick={() => setOpen(true)} />
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='w-full gap-4 p-6'>
          <h2>Are you sure you want to delete this data?</h2>
          <div className='flex justify-end gap-4 p-4'>
            <Button onClick={handleDelete}>Yes</Button>
            <Button onClick={() => setOpen(false)}>No</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteData
