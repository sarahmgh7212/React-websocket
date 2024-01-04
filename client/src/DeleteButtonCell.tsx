import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';

interface DeleteButtonCellProps {
  onDelete: Function;
  userId: string;
}

function DeleteButtonCell(props: DeleteButtonCellProps) {
  const { onDelete, userId } = props;

  const handleDelete = () => {
    onDelete(userId);
  };

  return (
    <Tooltip title="Delete">
      <IconButton onClick={handleDelete}>
        <DeleteIcon sx={{ color: blue[600] }} />
      </IconButton>
    </Tooltip>
  );
}

export default DeleteButtonCell;
