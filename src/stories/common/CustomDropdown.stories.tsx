import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CustomDropdown } from './CustomDropdown';

export default {
    title: 'Common/Custom Dropdown',
    component: CustomDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof CustomDropdown>;

const Template: ComponentStory<typeof CustomDropdown> = (args) => <CustomDropdown {...args} />;

export const Nothing = Template.bind({});
Nothing.args = {
    title: "Country"
};

export const SomeItems = Template.bind({});

SomeItems.args = {
    title: "Country",
    options: [
        {value: "USA"},
        { value: "Brazil" },
        { value: "Canada" }
    ]
};
