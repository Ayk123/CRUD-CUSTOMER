<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CustomerController extends Controller
{
    //
    public function index(Request $request){
        $customers = Customer::orderByDesc('updated_at')->paginate(2);
        return Inertia::render('Dashboard', ['customers' => $customers]);
    }

    public function store(Request $request){
        // dd($request->all());
       $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email',
            'contact_number' => ['required', 'regex:/^\+?[0-9]{10,15}$/'],
        ]);
        $customer = Customer::create($validatedData);
        return Redirect::back()->with(['message' => 'Successfully Added a Customer']);
    }

    public function destroy($id){
        Customer::findOrFail($id)->delete();
        return Redirect::back()->with(['message' => 'Successfully Deleted a Customer']);
    }

    public function update(Request $request, Customer $customer){
        // dd($customer->id);

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:customers,email,' . $customer->id,
            'contact_number' => ['required', 'regex:/^\+?[0-9]{10,15}$/'],
        ]);
        $customer->update($validatedData);
        return Redirect::back()->with(['message' => 'Successfully Update a Customer']);
    }

}
