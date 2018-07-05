import React, { Component } from 'react';
import './Item.css';
import Header from './Header';
import Button from './buttons/Button';
import { Card as RCard } from 'reactstrap';

class Item extends Component {
  constructor(props){
    super(props);

    this.state = {
      issues: props.issues || [],
      comments: props.comments || []
    };
  }

  componentDidMount(){
    this.fetchItem();
    this.fetchComments();
  }

  fetchItem() {
    fetch('/api/v1/issues.json')
      .then((response) => response.json())
      .then(issues => {
        this.setState({
          issues: issues
        });
      });
  }

  fetchComments() {
    fetch('/api/v1/comments.json')
      .then((response) => response.json())
      .then(comments => {
        this.setState({
          comments: comments
        });
      });
  }

  getDays(created_at) {
    const today = new Date();
    const createdOn = new Date(created_at);
    const msInDay = 24 * 60 * 60 * 1000;

    createdOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0)

    return Math.ceil((+today - +createdOn) / msInDay)
  }

  render() {
    const { issues, comments } = this.state;

    const issue = issues[0];

    if (typeof (issue) === 'undefined') {
      return <div>loading...</div>;
    }
    // if (typeof (comments) === 'undefined') {
    //   return <div>loading...</div>;
    // }

    return (
      <div className="Item">
        <Header />

        <div className="d-flex align-items-center justify-content-center">
          <div className="Item-section m-2 w-100">
            <div className="mt-4 mb-4"><Button title="Back to issues" icon="back" /></div>

            <RCard className="Item-hcard px-5">
              <h1>{issue.title}</h1>
              <div className="d-flex">
                <div className="Item-status badge badge-primary mr-3"><img src="/img/icons/open-white.png" alt="exclamation" /> OPEN</div>
                <div className="Item-description">#{issue.number} opened {this.getDays(issue.created_at)} days ago by <a href="">{issue.user.login}</a></div>
              </div>
            </RCard>

            {comments.map(comment => (
              <div className="media mt-5">
                <img className="Item-avatar mr-3 rounded-circle" src={comment.user.avatar_url} alt={comment.user.login} />
                <div className="Item-comment-body media-body">
                  <RCard className="Item-dcard">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><a href="">{comment.user.login}</a> commented {this.getDays(comment.created_at)} days ago</li>
                      <li class="list-group-item">{comment.body}</li>
                    </ul>
                </RCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
