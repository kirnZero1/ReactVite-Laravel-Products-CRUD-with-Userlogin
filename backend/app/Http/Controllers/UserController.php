<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate; //Gate::authorize('modify', $post)
use Illuminate\Support\Facades\Cookie;


class UserController extends Controller
{
    public function create(Request $request){
        $data = $request->validate([
            "username" => "required|string|max:100",
            "email" => "required|email|unique:users,email",
            "password" => "required|max:100|confirmed"
        ]);

        $user = User::create($data);
        $token = $user->createToken('mysampleApp')->plainTextToken;
        // $cookie = Cookie::make('auth_token', $token, 60,  '/', null, true, false);

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function login(Request $request){
        $data = $request->validate([
            "email" => "required|email",
            "password" => "required|max:100"
        ]);

        $user = User::where('email', $data['email'])->first();

        if(!$user || !Hash::check($data['password'], $user->password))
        {
            return ['message' => 'Bad credentials'];
        }

        $token = $user->createToken('mysampleApp')->plainTextToken;

        // $cookie = Cookie::make(
        //     'auth_token',
        //     $token,
        //     30, // Expiration in minutes
        //     '/', // Path
        //     null, // Domain
        //     true, // Secure (set to true in production with HTTPS)
        //     true, // HttpOnly
        //     false, // Raw
        //     'None' // SameSite policy
        // );
     //   $cookie = Cookie::make('auth_token', $token, 60,  '/');
    //  $cookie = Cookie::make('auth_token', 'your_token_value', 60); // Expires in 60 minutes
    // $cookie = Cookie::make('auth_token', $token, 60,  '/', null, true, false, false,'None');
    // $cookie = Cookie::make('auth_token', $token, 60, '/', null, true, false,false,'None');
        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
    }

    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response([
            'message' => 'logout successfully'
        ]);
    }
}
