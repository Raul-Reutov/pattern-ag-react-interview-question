import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Popup } from './Popup';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Common/Popup',
    component: Popup,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes

} as ComponentMeta<typeof Popup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />;

export const Main = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Main.args = {
    magnitude: 1.27,
    title: "Some title",
    time: 1614612591627,
    place: "some address, CA"
};

