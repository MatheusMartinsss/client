import { TextField, TextFieldProps } from "@mui/material"

type DecimalInputProps = {
    handleChange: (e: string) => void
} & TextFieldProps

export const DecimalInput = ({ handleChange, ...props }: DecimalInputProps) => {
    const { value } = props
    return (
        <TextField
            {...props}
            onChange={(e) => {
                const entry = e.target.value
                const newValue = addNumberRightToLeft(value, entry)
                handleChange(newValue)
            }}
            value={value}
        >
        </TextField>
    )
}

function addNumberRightToLeft(number: any, newEntry: any) {
    const old = (number.toString().split('.')[1] || '')
    const entry = (newEntry.toString().split('.')[1] || '')
    if (/[^0-9.]/.test(newEntry) || !Number(newEntry)) {
        return number;
    }
    if (entry.length < old.length || newEntry == '') {
        return 0.00
    }
    if (number == 0) {
        number = ((number * 10) + (newEntry / 100)).toFixed(2);
        return number;
    } else {
        return (newEntry * 10).toFixed(2)
    }
}
