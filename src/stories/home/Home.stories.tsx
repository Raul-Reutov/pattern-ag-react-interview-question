import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Home } from './Home';

export default {
    title: 'Home/Home Page',
    component: Home,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home />;

export const Main = Template.bind({});
Main.args = {};
