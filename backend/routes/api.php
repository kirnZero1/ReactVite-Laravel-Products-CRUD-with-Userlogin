<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

// Route::get('products',[ProductController::class, 'index']);
// Route::get('products/{product}',[ProductController::class, 'show']);

Route::post('user/create',[UserController::class, 'create']);
Route::post('user/login',[UserController::class, 'login']);

Route::fallback(function () {
    return response()->json(['error' => 'Route not found'], 404);
});

Route::middleware('auth:sanctum')->group(function(){

    Route::get('products',[ProductController::class, 'index']);
    Route::get('products/{product}',[ProductController::class, 'show']);

    Route::post('products/store',[ProductController::class, 'store']);
    Route::put('products/{product}/update',[ProductController::class, 'update']);
    Route::delete('products/{product}/delete',[ProductController::class, 'destroy']);
    Route::post('user/logout',[UserController::class, 'logout']);
});
