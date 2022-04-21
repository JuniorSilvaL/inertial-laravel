<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
class HomepageController extends Controller
{
    public function index(){
        $data = [
            'title' =>[
                'en'=>'title',
                'pt'=>'titulo'
            ]
        ];
        return Inertia::render('homepage', $data);
    }
    public function show(Request $request){
        $onlyTest = $request->all();
        dd($onlyTest);
//        return Inertia::render('details', $onlyTest);
    }
}
