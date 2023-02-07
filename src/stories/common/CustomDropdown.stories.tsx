import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CustomDropdown } from './CustomDropdown';


export default {
    title: 'Common/Custom Dropdown',
    component: CustomDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CustomDropdown>;

const Template: ComponentStory<typeof CustomDropdown> = (args) => <CustomDropdown {...args} />;

export const Nothing = Template.bind({});

Nothing.args = {};

export const SomeItems = Template.bind({});
SomeItems.args = {
    options: [

    ],
};

