import { useEffect, useState } from 'react';
import '../../../index.css'
import { 
  createColumnHelper, 
  flexRender, 
  getCoreRowModel, 
  getSortedRowModel, 
  SortingState, 
  useReactTable 
} from "@tanstack/react-table"
import { IDrill } from '../../../shared/types/types';
import { getData } from '../../../shared/utils/api';
import { endpoints } from '../../../shared/consts/consts';
import { Button } from '@mui/material';
import { FilterDiameter } from './FilterDiameter';

export const BasicTable = () => {
  const [data, setData] = useState<IDrill[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isBroken, setIsBroken] = useState(false)

  useEffect(() => {
    getData(`${endpoints.drills}?broken=${isBroken}`).then((res) => setData(res));
  }, [sorting, isBroken]);
  
  const colunmHelper = createColumnHelper<IDrill>();

  const columns = [
    colunmHelper.accessor('id', {
      header: () => 'ID',
      cell: (info) => info.getValue(),
    }),
    colunmHelper.accessor('name', {
      header: () => 'Name',
      cell: (info) => info.getValue(),
    }),
    colunmHelper.accessor('diameter', {
      header: () => 'Diameter',
      cell: (info) => info.getValue(),
    }),
    colunmHelper.accessor('length_xD', {
      header: () => 'Length_xD',
      cell: (info) => info.getValue(),
    }),
    colunmHelper.accessor('deep_of_drill', {
      header: () => 'Deep of Drill',
      cell: (info) => info.getValue(),
    }),
    colunmHelper.accessor('plate', {
      header: () => 'Plate',
      cell: (info) => info.getValue(),
    }),
    colunmHelper.accessor('screw', {
      header: () => 'Screw',
      cell: (info) => info.getValue(),
    }),
    colunmHelper.accessor('company', {
      header: () => 'Company',
      cell: (info) => info.getValue(),
    }),
    colunmHelper.accessor('image_path', {
      header: () => 'Image',
      cell: (info) => (
        <img
          style={{ width: '100%', height: '50px', objectFit: 'contain' }}
          src={`${import.meta.env.VITE_BASE_URL}${info.getValue()}`} alt="Not Image" />
      ),
    }),
  ]
  const table = useReactTable({
    data: data,
    columns,
    debugTable: false,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting
    },
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  })

  return (
    <div className='container'>
      <div className='container_actions'>
        <FilterDiameter drills={data} />
        <Button
          sx={{mb: 1,}}
          variant="outlined"
          onClick={() => setIsBroken(!isBroken)}
        >
          {isBroken ? 'Показать исправные' : 'Показать сломанные'}
        </Button>
      </div>
      <div className='scrollable-content'> 
        <table className='drills-table'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className='drills-table-cell'>
                    <div
                      className={
                        header.column.getCanSort()
                          ? 'cursor-pointer select-none'
                          : ''
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === 'asc'
                            ? 'Sort ascending'
                            : header.column.getNextSortingOrder() === 'desc'
                              ? 'Sort descending'
                              : 'Clear sort'
                            : undefined
                          }
                        >
                      {flexRender(
                        header.column.columnDef.header, 
                        header.getContext()
                      )}
                      {{
                        asc: '\u{2191}',
                        desc: '\u{2193}',
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className='drills-table-cell'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}