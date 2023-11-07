import { Button } from "@mui/material";
import { FC } from "react";

interface CustomButtonProps {
    isActive?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}


const FilterButton: FC<CustomButtonProps> = ({ isActive = false, onClick, children }) => {
    return (
        <Button
            variant="outlined"
            fullWidth
            color={isActive ? 'primary' : 'inherit'}
            onClick={onClick}
            sx={{
                height: 40,
                borderColor: isActive ? 'primary.main' : 'rgba(0, 0, 0, 0.23)',
                backgroundColor: isActive ? 'primary.main' : 'transparent',
                color: isActive ? 'white' : 'black',
                boxShadow: isActive ? '0 2px 4px rgba(0, 0, 0, 0.2)' : 'none',
                '&:hover': {
                    backgroundColor: isActive ? 'primary.dark' : 'rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            {children}
        </Button>
    )
}

export default FilterButton;