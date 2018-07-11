<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class IssuesResource extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->collection->map(function($issue) {
            return collect($issue)->only([
                'id',
                'number',
                'title',
                'user',
                'labels',
                'state',
                'comments',
                'created_at',
            ]);
        });
    }
}
