<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function oAuth(Request $request)
    {
        $code = $request->code;

        $token = self::getGithubToken($code);

        if ($token->access_token) {
            session()->put('github_token', $token->access_token);
            return (array)$token;
        } else {
            $token;
        }
    }

    public static function getGithubToken($code)
    {
        $client = new Client();
        
        $res = $client->request('POST', 'https://github.com/login/oauth/access_token', [
            'form_params' => [
                'client_id' => env('GITHUB_CLIENT_ID'),
                'client_secret' => env('GITHUB_CLIENT_SECRET'),
                'code' => $code,
            ],
            'headers' => [
                'Accept'     => 'application/json',
            ]
        ]);

        $body = $res->getBody();

        $data = json_decode($body);
        
        return $data;
    }
}
