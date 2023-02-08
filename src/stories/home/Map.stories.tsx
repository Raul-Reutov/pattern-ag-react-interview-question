import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Map } from './Map';

export default {
    title: 'Home/Map',
    component: Map,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof Map>;

const Template: ComponentStory<typeof Map> = (args) => <Map />;

export const Main = Template.bind({});
Main.args = {};
