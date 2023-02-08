import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import "./custom-dropdown.css"
interface CustomDropdownProps {
    title: string;
    currentSelection?: string;
    options?: Array<string>;
    onClick?: (choice: string) => void;
}

export const CustomDropdown = ({
    options = [],
    ...props
}: CustomDropdownProps) => {
    const [currentSelection, setCurrentSelection] = React.useState("All")

    // Function to update the display for the selected choice
    const updateSelected = (selection: string) => {
        setCurrentSelection(selection);
        if (props.onClick) {
            props.onClick(selection);
        }
    }

    return (
        <div className="dropdown">
            <p>{props.title}:</p>
            <Dropdown >
                <Dropdown.Toggle>
                    {currentSelection}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        // Populate the dropdown with all of the options.
                        options.map((option) => 
                            <Dropdown.Item onClick={() => updateSelected(option)}>{option}</Dropdown.Item>
                        )
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};
