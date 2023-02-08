import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Filter } from './Filter';

export default {
    title: 'Home/Filter',
    component: Filter,
    parameters: {
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = (args) => <Filter />;

export const Main = Template.bind({});
