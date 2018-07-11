<?php

namespace App;

use Cache;
use GitHub;
use \Github\Client;
use Illuminate\Http\Request;

class Repo
{
    public static function show()
    {
        $github_token = session()->get('github_token');

        GitHub::authenticate($github_token, null, Client::AUTH_JWT);

        $data = Cache::remember("repo", env('GITHUB_CACHE_MINS'), function () {
            return GitHub::repo()->show(env('GITHUB_REPO_OWNER'), env('GITHUB_REPO_NAME'));
        });

        $closedIssuesInfo = self::getClosedIssuesInfo();
        $closedIssuesInfo['data']['repository']['issues']['totalCount'];

        $data['closed_issues_count'] = $closedIssuesInfo['data']['repository']['issues']['totalCount'];

        return collect($data);
    }

    public static function getClosedIssuesInfo()
    {
        $query = <<<'QUERY'
query($repoOwner: String!, $repoName: String!) { 
  repository(owner: $repoOwner, name: $repoName) {
    issues(states: CLOSED) {
      totalCount
    }
  }
}
QUERY;

        $variables = [
            'repoOwner' => env('GITHUB_REPO_OWNER'),
            'repoName' => env('GITHUB_REPO_NAME'),
        ];

        $github_token = session()->get('github_token');

        GitHub::authenticate($github_token, null, Client::AUTH_JWT);

        $data = Cache::remember("closedIssuesInfo", env('GITHUB_CACHE_MINS'), function () use ($query, $variables) {
            return GitHub::graphql()->execute($query, $variables);
        });

        return $data;
    }
}
