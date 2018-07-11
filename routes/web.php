<?php

Route::redirect('/', 'http://localhost:3000');

$this->get('logout', 'Auth\LoginController@logout')->name('logout');
