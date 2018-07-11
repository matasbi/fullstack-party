import React, { Component } from 'react';
import { Card as RCard } from 'reactstrap';
import { Link } from 'react-router-dom';
import ta from 'time-ago';
import './Card.css';

class Card extends Component {

  renderBadgeColor(badgeName) {
    switch (badgeName) {
      case 'Bug':
        return 'badge-danger'
      case 'Deprecation':
        return 'badge-warning'
      case 'Unconfirmed':
        return 'badge-dark'
      default:
        return 'badge-info';
    }
  }

  render() {
    const { issue } = this.props;

    return (
      <RCard className="Card m-3 p-3">
        <div className="row">
          <div className="col text-center">{(issue.state === 'open' && <img src="/img/icons/exclamation.png" alt="open" />
          ) || (
            <img src="/img/icons/closed.png" alt="closed" />
          )}</div>
          <div className="col-10 col-sm-9 col-md-9">
            <div className="Card-title-row">
              <Link to={`/issue/${issue.number}`} className="Card-title">{issue.title}</Link>
              <div className="Card-badges d-inline">
              {issue.labels.map((label, i) => (
                  <div key={i} className={`Card-badge badge ml-1 ${this.renderBadgeColor(label.name)}`}>{label.name}</div>
              ))}
              </div>
            </div>
            <div className="Card-description">#{issue.number} opened {ta.ago(issue.created_at)} by <a href={`http://github.com/${issue.user.login}`}target="_blank">{issue.user.login}</a></div>
          </div>
          <div className="col-2 d-none d-sm-block text-center">
          {issue.comments > 0 && (
            <Link to={`/issue/${issue.number}`} className="Card-chat"><img src="/img/icons/chat.png" alt="Chat" /><span className="ml-1">{issue.comments}</span></Link>
          )}
          </div>
        </div>
      </RCard>
    );
  }
}

export default Card;
