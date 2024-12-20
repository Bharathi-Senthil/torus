'use client'
import { Button, DropdownMenu, TextInput } from '@gravity-ui/uikit'
import React, { useCallback, useMemo } from 'react'
import { Sliders } from '@gravity-ui/icons'
//import AddTableData from './AddTableData'
import { TopContentProps } from '../interfaces/interfaces'

const TableTopContent = ({
  columns = [],
  filterValue = '',
  setRefetch = () => {},
  setFilterValue = () => {},
  setPage = () => {},
  filterColumn = '',
  setFilterColumn = () => {},
  paginationData={page: 1, pageSize: 10},
  onSearch
}: TopContentProps) => {
  return (
    <div className='flex w-full gap-3 p-3'>
      <div className='w-[30%]'>
        <TextInput
          placeholder={`Search by ${filterColumn}...`}
          value={filterValue}
          onChange={e => setFilterValue(e.target.value)}
          hasClear
          rightContent={
            <DropdownMenu
              renderSwitcher={props => (
                <div {...props} style={{ cursor: 'pointer' }}>
                  <Sliders />
                </div>
              )}
              items={columns.map((item: any) => ({
                action: () => setFilterColumn(item.id),
                text: item.id
              }))}
            />
          }
        />
      </div>
      <Button onClick={() => onSearch(paginationData.page, paginationData.pageSize)}>search</Button>
    </div>
  )
}

export default TableTopContent
