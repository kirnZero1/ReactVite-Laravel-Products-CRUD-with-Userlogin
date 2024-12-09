<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
        public function index()
        {
            $products = Product::all();
           $token = auth()->user()->tokens;
            return response([
                "products" => $products,
                "tokens" => $token
            ], 200);
        }

        public function show(Product $product)
        {
            $product = Product::findOrFail($product->id);

            return response([
                "product" => $product
            ], 200);
        }

        public function store(Request $request)
        {
            $data = $request->validate([
                "name" => "required|max:255|string",
                "qty" => "required|integer",
                "price" => "required|decimal:0,2",
                "description" => "nullable"
            ]);

            $product = Auth()->user()->product()->create($data);

            return response([
                "product" => $product,
                "message" => "Successfully created a Product."
            ], 200);
        }


        public function update(Request $request, Product $product)
        {
            $data = $request->validate([
                "name" => "required|max:255|string",
                "qty" => "required|integer",
                "price" => "required|decimal:0,2",
                "description" => "nullable"
            ]);


            // $product = Auth()->user()->product()->update($data);
            $user = Auth::user()->product()->find($product->id);

            if(!$user){
                return response(['error' => 'Credentials not found.'],400);
            }

            $product = $user->update($data);

            return response([
                "product" => $product,
                "message" => "Successfully updated Product."
            ], 200);
        }

        public function destroy( Product $product)
        {

            // $product = Auth()->user()->product()->delete();
            $user = Auth::user()->product()->find($product->id);

            if(!$user){
                return response(['error' => 'Credentials not found.'],400);
            }

            $product = $user->delete();



            return response([
                "message" => "Successfully deleted a Product."
            ], 200);
        }
}
