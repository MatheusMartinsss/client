import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel } from '@mui/material';

interface DateInputProps {
    label?: string;
    value: string;
    onChange: (newValue: string) => void;
}

const FilterDateInput: React.FC<DateInputProps> = ({ label, value, onChange }) => {

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <FormControl fullWidth>
            <TextField
                id="date"
                type="date"
                label={label}
                size='small'
                value={value}
                onChange={handleDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{
                    height: 40,
                }}

            />
        </FormControl>
    );
};

export default FilterDateInput;