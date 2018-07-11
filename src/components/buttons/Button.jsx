import React, { Component } from 'react';
import { Button as RSButton } from 'reactstrap';
import './Button.css';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'icon': props.icon || null,
            'color': props.color || 'link',
            'activityStatus': props.activityStatus || null,
            'disabled': props.disabled || false,
            'onClick': props.onClick || null,
            'className': props.className || null,
        }
    }

    render() {
        const { title } = this.props;
        const { icon, color, activityStatus, disabled, onClick, className } = this.state;

        return (
            <RSButton color={color} onClick={onClick} className={`Button ${className ? className : ''} ${activityStatus === 'active' ? 'active' : ''} ${activityStatus === 'inactive' ? 'inactive' : ''}`} disabled={disabled}>
                {icon && 
                    <img className="Button-icon mr-2" src={`/img/icons/${icon}.png`} alt={title} />
                }{title}
            </RSButton>
        );
    }
}

export default Button;
