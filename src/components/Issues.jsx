import React, { Component } from 'react';
import './Issues.css';
import Header from './Header';
import Button from './buttons/Button';
import Card from './Card';
import { Redirect } from 'react-router-dom';

class Issues extends Component {
  constructor(props) {
    super(props);

    const { repoState, page } = props.match.params;
    
    const activePage = page ? parseInt(page, 10) : 1;

    this.state = {
      isLoading: true,
      repoState: repoState || 'open',
      activePage: activePage,
      repo: props.repo || [],
      issues: props.issues || [],
      isError: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const locationChanged = nextProps.location !== this.props.location

    const { repoState, page } = nextProps.match.params;

    if (locationChanged) {
      this.setState({
        repoState: repoState,
        activePage: page ? parseInt(page, 10) : 1,
        isLoading: true,
      }, () => {
        this.fetchIssues();
      });
    }
  }

  componentDidMount() {
    this.fetchRepo();
    this.fetchIssues();
  }

  fetchRepo() {
    fetch(`${process.env.REACT_APP_API_URL}/repo`, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then(repo => {
        this.setState({
          repo: repo.data,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error)
        this.setState({
          isError: true
        });
      });
  }

  fetchIssues() {
    const {repoState, activePage} = this.state;

    fetch(`${process.env.REACT_APP_API_URL}/issues?state=${repoState}&page=${activePage}`, {
      credentials: 'include'
    })
      .then((response) => response.json())
      .then(issues => {
        this.setState({
          issues: issues.data,
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

  render() {
    const { repoState, issues, repo, isLoading, isError } = this.state;

    if (isError) {
      return <Redirect to={{ pathname: "/" }} />;
    }

    return (
      <div className="Issues">
        <Header />

        <div className="row no-gutters align-items-center">

          <div className="Issues-leftcol bg-light pt-3 px-3 col-12 col-lg-6">
            
            {(isLoading && (
              <div className="d-flex justify-content-center p-5">Loading...</div>
            )) || (
              <div>
                <div className="Issues-scroll">
                  <div className="d-flex flex-row justify-content-center">
                    <Button icon="open" title={`${repo.total_open_count} Open`} onClick={() => this.changeRepoState('open')} activityStatus={repoState === 'open' ? 'active' : 'inactive'} disabled={repoState === 'open'} />
                    <Button icon="closed" title={`${repo.total_closed_count} Closed`} onClick={() => this.changeRepoState('closed')} activityStatus={repoState === 'closed' ? 'active' : 'inactive'} disabled={repoState === 'closed'} />
                  </div>

                  {issues.map((issue, i) => (
                    <Card key={i} issue={issue} />
                  ))}
                </div>

                {this.renderPagination()}
            </div>
            )}

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

  changeRepoState(repoState) {
    this.props.history.push('/issues/' + repoState);
  }

  changePage(page) {
    this.props.history.push('/issues/' + this.state.repoState + '/' + page);
  }

  renderPagination() {
    const { repo, activePage, repoState } = this.state;

    let pages = [];

    const totalCount = repoState === 'open' ? repo.total_open_count : repo.total_closed_count;

    const totalPages = Math.ceil(totalCount / 30);
    
    let _page = 0;
    for (let page = 1; page <= totalPages; page += 1) {
      if (page !== 1 && page < activePage - 1 && page < totalPages - 3) {
        continue;
      }
      if (pages.length > 3 && activePage + 1 < page && page < totalPages) {
        continue;
      }
      if (_page !== page -1) {
        pages.push(<li key={page - 1} className="page-item d-flex align-items-center"><span>...</span></li>);
      }
      pages.push(<li key={page} className={`page-item ${ page === activePage ? 'active' : '' }`}><a className="page-link" onClick={() => this.changePage(page)}>{page}</a></li>);
      if (pages.length > 5) {
        break;
      }
      _page = page;
    }

    return <nav aria-label="...">
      <ul className="pagination justify-content-center">
        <li className="page-item"><Button title="Previous" className="Issues-nav-btn" onClick={() => this.changePage(activePage - 1)} disabled={activePage === 1} /></li>
        {pages}
        <li className="page-item"><Button title="Next" className="Issues-nav-btn" onClick={() => this.changePage(activePage + 1)} disabled={activePage === totalPages} /></li>
      </ul>
    </nav>;
  }
}

export default Issues;
