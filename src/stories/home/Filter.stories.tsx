import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Filter } from './Filter';

export default {
    title: 'Home/Filter',
    component: Filter,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof Filter>;

const Template: ComponentStory<typeof Filter> = (args) => <Filter {...args} />;

export const Main = Template.bind({});
Main.args = {};
