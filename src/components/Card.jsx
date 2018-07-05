import React, { Component } from 'react';
import { Card as RCard } from 'reactstrap';
import './Card.css';

class Card extends Component {

  getDays() {
    const { issue } = this.props;
    const today = new Date();
    const createdOn = new Date(issue.created_at);
    const msInDay = 24 * 60 * 60 * 1000;

    createdOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0)

    return Math.ceil((+today - +createdOn) / msInDay)
  }

  render() {
    const { issue } = this.props;

    return (
      <RCard className="m-3 p-3">
        <div className="row">
          <div className="col p-2 text-center"><img src="/img/icons/exclamation.png" alt="exclamation" /></div>
          <div className="col-10 col-sm-9 col-md-9 p-2">
            <div className="Card-title">{issue.title}
            {issue.labels.map((label, i) => (
                <div key={i} className="Card-badge badge ml-1 badge-danger">{label.name}</div>
            ))}
            </div>
            <div className="Card-description">#{issue.number} opened {this.getDays()} days ago by <a href="">{issue.user.login}</a></div>
          </div>
          <div className="col-2 d-none d-sm-block text-center">
          {issue.comments > 0 && (
            <span className="Card-chat">
              <img src="/img/icons/chat.png" alt="Chat" /> {issue.comments}
            </span>
          )}
          </div>
        </div>
      </RCard>
    );
  }
}

export default Card;
