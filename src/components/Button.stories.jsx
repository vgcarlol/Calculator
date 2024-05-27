import React from 'react';
import Button from './Button';

export default {
    title: 'Button',
    component: Button,
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    className: 'button',
    children: '1',
    onClick: () => alert('Button clicked!'),
};