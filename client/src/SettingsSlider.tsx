import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

interface SettingsSliderProps {
  numOfLines: number;
  onNumOfLinesChange: Function;
}

const marks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 20,
    label: '20',
  },
];

function SettingsSlider(props: SettingsSliderProps) {
  const { numOfLines, onNumOfLinesChange } = props;

  const valuetext = (value: number): string => {
    onNumOfLinesChange(value);
    return `${value}`;
  };

  return (
    <Box sx={{ width: 800 }}>
      <small>Limit</small>
      <Slider
        aria-label="Num-of-lines"
        defaultValue={10}
        value={numOfLines}
        onChange={(_, value) => onNumOfLinesChange(value)}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        min={1}
        max={20}
        sx={{ width: 1 }}
      />
    </Box>
  );
}
export default SettingsSlider;
