import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IDrill } from '../../api';
import { normalizeDate } from '../../utils/normalizeDate';

interface ITableDrills {
  drills: IDrill[];
}

export const BasikTable: React.FC<ITableDrills> = ( props ) => {
  const { drills } = props;

  return (
    <TableContainer component={ Paper }>
      <Table sx={{ minWidth: 700 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>ID</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Name</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Diameter</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Length</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Deep of Drill</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Plate</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Screws</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Company</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Storage</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Create at</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Update at</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Broken</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Image path</TableCell>
            <TableCell sx={{ padding: '3px', textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drills.sort((a,b) => a.name.localeCompare(b.name)).map((drill) => (
            <TableRow
              key={drill.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ padding: '3px', textAlign: 'center' }}>{drill.id}</TableCell>
              <TableCell sx={{ padding: '3px', textAlign: 'center' }} component="th" scope="row">
                {drill.name}
              </TableCell>
              <TableCell sx={{ padding: '3px', textAlign: 'center' }}>{drill.diameter}</TableCell>
              <TableCell sx={{ padding: '3px', textAlign: 'center' }}>{drill.length}</TableCell>
              <TableCell sx={{ padding: '3px', textAlign: 'center' }}>{drill.deep_of_drill}</TableCell>
              <TableCell sx={{ padding: '3px', textAlign: 'center' }}>{drill.plate}</TableCell>
              <TableCell sx={{ padding: '3px', textAlign: 'center' }}>{drill.screws}</TableCell>
              <TableCell sx={{ padding: '3px', textAlign: 'center' }}>{drill.company}</TableCell>
              <TableCell sx={{ padding: '3px', textAlign: 'center' }}>{drill.storage}</TableCell>
              <TableCell sx={{ padding: '3px', textAlign: 'center' }}>{normalizeDate(drill.create_at)}</TableCell>
              <TableCell sx={{ padding: 0, textAlign: 'center' }}>{normalizeDate(drill.update_at)}</TableCell>
              <TableCell sx={{ padding: 0, textAlign: 'center' }}><input type="checkbox"/></TableCell>
              <TableCell sx={{ padding: 0, textAlign: 'center' }}>{drill.image_path}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}