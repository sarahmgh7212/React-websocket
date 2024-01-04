import * as React from 'react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { GridColDef } from '@mui/x-data-grid';

import DeleteButtonCell from './DeleteButtonCell.tsx';
import CustomTabPanel from './CustomTabPanel.tsx';
import Leaderboard from './Leaderboard.tsx';
import SettingsSlider from './SettingsSlider.tsx';

const socket = io('http://localhost:3050');

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export interface UserData {
  userId: string;
  avatar: string;
  username: string;
  email: string;
  score: number;
}

export default function App() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [value, setValue] = useState(0);
  const [numOfLines, setNumOfLines] = useState(10);

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <Avatar
          alt={`Avatar ${params.row.userId}`}
          src={params.row.avatar}
          variant="square"
        />
      ),
    },
    {
      field: 'username',
      headerName: 'Username',
      headerAlign: 'left',
      width: 250,
    },
    { field: 'email', headerName: 'Email', headerAlign: 'left', width: 250 },
    { field: 'score', headerName: 'Score', headerAlign: 'left', width: 100 },
    {
      field: 'delete',
      headerName: '',
      width: 60,
      renderCell: (params) => (
        <DeleteButtonCell
          onDelete={handleDeleteItem}
          userId={params.row.userId}
        />
      ),
    },
  ];

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ): void => {
    setValue(newValue);
  };
  const handleDeleteItem = (id: string): void => {
    setUserData((prevState) => prevState.filter((user) => user.userId !== id));
  };

  const handleNumOfLinesChange = (value: number): void => {
    setNumOfLines(value);
  };

  useEffect(() => {
    const handleUserData = (newUserData: UserData) => {
      const isHighScore = userData.every(
        (user) => newUserData.score >= user.score
      );

      isHighScore && setUserData((prevState) => [...prevState, newUserData]);
    };

    socket.on('userData', handleUserData);

    return () => {
      // Cleanup the socket event listener when the component unmounts
      socket.off('userData', handleUserData);
    };
  }, [userData]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="leaderboard" {...a11yProps(0)} />
            <Tab label="settings" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Leaderboard
            rows={userData}
            columns={columns}
            numOfLines={numOfLines}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {/* Sets number of lines in table  */}
          <SettingsSlider
            numOfLines={numOfLines}
            onNumOfLinesChange={handleNumOfLinesChange}
          />
        </CustomTabPanel>
      </Box>
    </>
  );
}
