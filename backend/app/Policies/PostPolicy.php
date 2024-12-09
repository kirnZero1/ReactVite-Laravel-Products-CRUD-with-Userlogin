<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Product;

class PostPolicy
{
    /**
     * Create a new policy instance.
     */
    // public function __construct()
    // {
    //     //
    // }

    public function modify(User $user, Product $product):bool
    {
        return $user->id === $product->user_id;
    }

}
