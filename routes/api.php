<?php

use App\Repo;
use App\Issue;
use App\Http\Resources\RepoResource;
use App\Http\Resources\IssuesResource;
use App\Http\Resources\DefaultResource;

Route::middleware('throttle:60,1')->group(function () {
    Route::post('/login/oauth', 'Auth\LoginController@oAuth');

    Route::middleware('oauth')->group(function () {
        Route::get('/token', function () {
            return session()->get('github_token');
        });

        Route::get('/repo', function () {
            return new RepoResource(Repo::show());
        });

        Route::get('/issues', function () {
            $request = request();
            return new IssuesResource(Issue::all($request));
        });

        Route::get('/issue/{number}', function ($number) {
            return new DefaultResource(Issue::find($number));
        });

        Route::get('/comments/{number}', function ($number) {
            return new DefaultResource(Issue::comments($number));
        });
    });
});
