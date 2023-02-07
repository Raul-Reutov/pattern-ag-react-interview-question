import React from 'react';
import { DropdownOption } from '../../interfaces/dropdown-option.interface';
import Dropdown from 'react-bootstrap/Dropdown';
import "./custom-dropdown.css"
interface CustomDropdownProps {
    title: string;
    currentSelection?: string;
    options?: Array<DropdownOption>;
    onClick?: (choice: string) => void;
}


/**
 * Primary UI component for user interaction
 */
export const CustomDropdown = ({
    options = [],
    ...props
}: CustomDropdownProps) => {
    const [currentSelection, setCurrentSelection] = React.useState("All")

    // Function to update the display with the selected choice
    const updateSelected = (selection: string) => {
        setCurrentSelection(selection);
        if (props.onClick) {
            props.onClick(selection);
        }
    }

    return (
        <div>
            <h4>{props.title}</h4>
            <Dropdown className="dropdown">
                <Dropdown.Toggle>
                    {currentSelection}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* Set Default Value */}
                    <Dropdown.Item onClick={() => updateSelected("All")}>All</Dropdown.Item>
                    {
                        // Populate the dropdown with all of the options.
                        options.map((option) => 
                            <Dropdown.Item onClick={() => updateSelected(option.value)}>{option.value}</Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};
