<?php

namespace ORBServices\Roles;

class Roles
{
    public function __construct()
    {
        add_action('init', [$this, 'create_client']);
    }

    function create_client()
    {
        add_role(
            'client',
            'Client',
            [
                'read' => true,
            ]
        );
    }
}