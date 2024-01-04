import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { GridColDef } from '@mui/x-data-grid';
import { UserData } from './App.tsx';
import './Leaderboard.css';

interface LeaderboardProps {
  rows: UserData[];
  columns: GridColDef[];
  numOfLines: number;
}

function Leaderboard(props: LeaderboardProps) {
  const { rows, columns, numOfLines } = props;

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.userId}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: numOfLines },
          },
        }}
      />
    </div>
  );
}

export default Leaderboard;
