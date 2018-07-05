import React, { Component } from 'react';
import './Issues.css';
import Header from './Header';
import Button from './buttons/Button';
import Card from './Card';

class Issues extends Component {
  constructor(props){
    super(props);

    this.state = {
      issues: props.issues || []
    };
  }

  componentDidMount(){
    this.fetchIssues();
  }

  fetchIssues() {
    fetch('/api/v1/issues.json')
      .then((response) => response.json())
      .then(issues => {
        this.setState({
          issues: issues
        });
      });
  }

  render() {
    const { issues } = this.state;

    return (
      <div className="Issues">
        <Header />

        <div className="row no-gutters align-items-center">

          <div className="Issues-leftcol bg-light pt-3 px-3 col-12 col-lg-6">
            
            <div className="Issues-scroll">
              <div className="d-flex flex-row justify-content-center">
                <Button icon="open" title="420 Open" isActive="1" disabled="true" />
                <Button icon="closed" title="6.969 Closed" isActive="0" />
              </div>

              {issues.map((issue, i) => (
                <Card key={i} issue={issue} />
              ))}              
            </div>

            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className="page-item"><a className="page-link-nav mr-2" href="">Previous</a></li>
                <li className="page-item active"><a className="page-link" href="">1</a></li>
                <li className="page-item"><a className="page-link" href="">2</a></li>
                <li className="page-item"><a className="page-link" href="">3</a></li>
                <li className="page-item"><a className="page-link-nav ml-2" href="">Next</a></li>
              </ul>
            </nav>

          </div>

          <div className="Issues-rightcol d-none d-lg-block col-xl-6 w-50">
            <div className="background" />
            <div className="d-flex align-items-center justify-content-center h-100">
              <div className="title text-center">
                  <h1>Full Stack Developer Task</h1> by <img height="16" src="/img/logo-light.png" alt="Logo" />
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Issues;
