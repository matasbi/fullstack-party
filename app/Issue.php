<?php

namespace App;

use Cache;
use GitHub;
use \Github\Client;
use Illuminate\Http\Request;

class Issue
{
    public static function all(Request $request)
    {
        $github_token = session()->get('github_token');
        GitHub::authenticate($github_token, null, Client::AUTH_JWT);

        $state = $request->state;
        $page = $request->page;

        $data = Cache::remember("issues:${state}:${page}", env('GITHUB_CACHE_MINS'), function () use ($state, $page) {
            return GitHub::issues()->all(env('GITHUB_REPO_OWNER'), env('GITHUB_REPO_NAME'), [
                'state' => $state,
                'page' => $page
            ]);
        });

        return collect($data);
    }

    public static function find($number)
    {
        $github_token = session()->get('github_token');
        GitHub::authenticate($github_token, null, Client::AUTH_JWT);

        $data = Cache::remember("issue:${number}", env('GITHUB_CACHE_MINS'), function () use ($number) {
            return GitHub::issues()->show(env('GITHUB_REPO_OWNER'), env('GITHUB_REPO_NAME'), $number);
        });

        return collect($data);
    }

    public static function comments($number)
    {
        $github_token = session()->get('github_token');
        GitHub::authenticate($github_token, null, Client::AUTH_JWT);

        $data = Cache::remember("comments:${number}", env('GITHUB_CACHE_MINS'), function () use ($number) {
            return GitHub::issues()->comments()->all(env('GITHUB_REPO_OWNER'), env('GITHUB_REPO_NAME'), $number);
        });

        return collect($data);
    }

}
