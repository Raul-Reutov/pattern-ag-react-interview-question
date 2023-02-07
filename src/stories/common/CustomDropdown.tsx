import { Dropdown } from 'semantic-ui-react'
import { DropdownOption } from '../../interfaces/dropdown-option.interface';

interface CustomDropdownProps {
    options?: Array<DropdownOption>;
}

/**
 * Primary UI component for user interaction
 */
export const CustomDropdown = ({
    options = [],
    ...props
}: CustomDropdownProps) => {

    return (
        <Dropdown 
            options={options}
        />
    );
};
