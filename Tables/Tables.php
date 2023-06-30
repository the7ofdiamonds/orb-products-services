<?php
namespace ORBServices\Tables;

class Tables
{

    public function __construct()
    {
        $this->create_invoice_table();
        $this->create_receipt_table();
    }

    function create_invoice_table()
    {
        global $wpdb;
        $table_name = 'orb_invoice';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table_name} (
            id INT NOT NULL AUTO_INCREMENT,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            stripe_invoice_id VARCHAR(255) DEFAULT NULL,
            payment_intent_id VARCHAR(255) DEFAULT NULL,
            name VARCHAR(255) DEFAULT NULL,
            email VARCHAR(255) DEFAULT NULL,
            phone VARCHAR(255) DEFAULT NULL,
            selections JSON DEFAULT NULL,
            subtotal VARCHAR(255) DEFAULT NULL,
            tax VARCHAR(255) DEFAULT NULL,
            grand_total VARCHAR(255) DEFAULT NULL,
            start_date VARCHAR(255) DEFAULT NULL,
            start_time VARCHAR(255) DEFAULT NULL,
            street_address VARCHAR(255) DEFAULT NULL,
            city VARCHAR(255) DEFAULT NULL,
            state VARCHAR(255) DEFAULT NULL,
            zipcode VARCHAR(255) DEFAULT NULL,
            PRIMARY KEY (id)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }

    function create_receipt_table()
    {
        global $wpdb;
        $table_name = 'orb_receipt';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table_name} (
        id INT NOT NULL AUTO_INCREMENT,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        invoice_id VARCHAR(255) DEFAULT NULL,
        payment_date VARCHAR(255) DEFAULT NULL,
        payment_amount VARCHAR(255) DEFAULT NULL,
        payment_type VARCHAR(255) DEFAULT NULL,
        balance VARCHAR(255) DEFAULT NULL,        
        PRIMARY KEY (id)
    ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
}

$orb_services_tables = new Tables();
