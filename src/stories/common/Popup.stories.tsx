import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Popup } from './Popup';

export default {
    title: 'Common/Popup',
    component: Popup,
} as ComponentMeta<typeof Popup>;

const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />;

export const Main = Template.bind({});
Main.args = {
    magnitude: 1.27,
    title: "Some title",
    time: 1614612591627,
    place: "some address, CA"
};

