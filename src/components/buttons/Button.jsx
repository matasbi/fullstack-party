import React, { Component } from 'react';
import { Button as RSButton } from 'reactstrap';
import './Button.css';

class Button extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'icon': props.icon || null,
            'title': props.title || '',
            'color': props.color || 'link',
            'isActive': props.isActive || '1',
            'disabled': props.disabled || false
        }
    }

    render() {
        const { icon, title, color, isActive, disabled} = this.state;

        return (
            <RSButton color={color} className={`Button ${isActive === '1' ? 'active' : 'inactive'}`} disabled={disabled ? 'disabled' : ''}>
                {icon && 
                    <img className="Button-icon mr-2" src={`/img/icons/${icon}.png`} alt={title} />
                }{title}
            </RSButton>
        );
    }
}

export default Button;
