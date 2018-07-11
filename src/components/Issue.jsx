import React, { Component } from 'react';
import './Issue.css';
import Header from './Header';
import Button from './buttons/Button';
import { Card as RCard } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import ta from 'time-ago';

class Issue extends Component {
  constructor(props){
    super(props);

    this.state = {
      number: parseInt(props.match.params.number, 10),
      issue: props.issue || [],
      comments: props.comments || [],
      isLoading: true,
      isError: false,
    };
  }

  componentDidMount(){
    this.fetchIssue();
    this.fetchComments();
  }

  fetchIssue() {
    fetch(`${process.env.REACT_APP_API_URL}/issue/${this.state.number}`, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then(issue => {
        this.setState({
          issue: issue.data,
          isLoading: false,
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          isError: true
        });
      });
  }

  fetchComments() {
    fetch(`${process.env.REACT_APP_API_URL}/comments/${this.state.number}`, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then(comments => {
        this.setState({
          comments: comments.data
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          isError: true
        });
      });
  }

  render() {
    const { issue, comments, isLoading, isError } = this.state;

    if (isError) {
      return <Redirect to={{ pathname: "/" }} />;      
    }

    return (
      <div className="Issue">
        <Header />

        <div className="d-flex align-items-center justify-content-center">
          <div className="Issue-section m-2 w-100">
            <div className="mt-4 mb-4"><Button className="Issue-back" title="Back to issues" onClick={() => this.props.history.goBack()} icon="back" /></div>

              {(isLoading && 
                <RCard className="Issue-hcard px-5">
                  <div className="d-flex justify-content-center p-4">Loading...</div>
                </RCard>
              ) || (
                <span>
                  <RCard className="Issue-hcard px-5">
                    <div className="d-flex">
                      <h2 className="Issue-title">{issue.title}</h2>
                      <span className="Issue-anchor ml-2">#{issue.number}</span>
                    </div>
                  <div className="d-flex align-items-center">
                      <div>
                        <div className={`Issue-status badge ${issue.state === 'open' ? 'badge-primary' : 'badge-light'} mr-3`}>{(issue.state === 'open' && <img src="/img/icons/open-white.png" alt="open" />
                        ) || (
                          <img src="/img/icons/closed.png" alt="closed" />
                        )} {issue.state === 'open' ? 'OPEN' : 'CLOSED'}</div>
                      </div>
                      <div className="Issue-description"><a href={`http://github.com/${issue.user.login}`} target="_blank">{issue.user.login}</a> opened this issue {ta.ago(issue.created_at)} - {comments.length} comments
                      </div>
                    </div>
                  </RCard>

                  <div className="Issue-comments">
                  {comments.map((comment, key) => (
                    <div key={key} className="media mt-5">
                      <img className="Issue-avatar mr-3 rounded-circle" src={comment.user.avatar_url} alt={comment.user.login} />
                      <div className="Issue-comment-body media-body">
                        <RCard className="Issue-dcard">
                          <ul className="list-group list-group-flush">
                          <li className="list-group-item"><a href={`http://github.com/${comment.user.login}`} target="_blank">{comment.user.login}</a> commented {ta.ago(comment.created_at)}</li>
                            <li className="list-group-item">{comment.body}</li>
                          </ul>
                      </RCard>
                      </div>
                    </div>
                  ))}
                  </div>
                </span>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Issue;
