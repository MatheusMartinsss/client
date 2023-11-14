import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import { format } from 'date-fns';

interface DateInputProps {
    label?: string;
    value?: Date | null;
    onChange: (newValue: Date | null) => void;
    props?: TextFieldProps
}

const FilterDateInput: React.FC<DateInputProps> = ({ label, value, onChange, props }) => {

    const valueFormated = value ? format(value, 'yyyy-MM-dd') : ''

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value ? new Date(event.target.value) : null);
    };

    return (
        <TextField
            {...props}
            id="date"
            type="date"
            label={label}
            value={valueFormated}
            onChange={handleDateChange}
            InputLabelProps={{
                shrink: true,
            }}
           

        />
    );
};

export default FilterDateInput;