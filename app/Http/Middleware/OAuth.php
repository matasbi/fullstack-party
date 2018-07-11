<?php

namespace App\Http\Middleware;

use Closure;

class OAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $github_token = session()->get('github_token');

        if (!$github_token) {
            return response([
                'error' => 'Token not found',
            ], 500);
        }

        return $next($request);
    }
}
