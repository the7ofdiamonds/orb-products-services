<?php

namespace ORB_Services\Tables;

require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

class Tables
{

    public function __construct()
    {
        $this->create_services_table();
        $this->create_client_table();
        $this->create_invoice_table();
        $this->create_receipt_table();
        $this->create_accounts_receivable();
    }

    function create_services_table()
    {
        global $wpdb;
        $table_name = 'orb_services';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table_name} (
            id INT NOT NULL AUTO_INCREMENT,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            post_id VARCHAR(255) DEFAULT NULL,
            features VARCHAR(255) DEFAULT NULL,
            unit_amount VARCHAR(255) DEFAULT NULL,
            description VARCHAR(255) DEFAULT NULL,
            PRIMARY KEY (id)
        ) $charset_collate;";

        dbDelta($sql);
    }

    function create_client_table()
    {
        global $wpdb;
        $table_name = 'orb_client';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table_name} (
            id INT NOT NULL AUTO_INCREMENT,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            user_id VARCHAR(255) DEFAULT NULL,
            stripe_customer_id VARCHAR(255) DEFAULT NULL,
            first_name VARCHAR(255) DEFAULT NULL,
            last_name VARCHAR(255) DEFAULT NULL,
            PRIMARY KEY (id)
        ) $charset_collate;";

        dbDelta($sql);
    }

    function create_invoice_table()
    {
        global $wpdb;
        $table_name = 'orb_invoice';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table_name} (
            id INT NOT NULL AUTO_INCREMENT,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(255) DEFAULT NULL,
            client_id VARCHAR(255) DEFAULT NULL,
            stripe_customer_id VARCHAR(255) DEFAULT NULL,
            stripe_invoice_id VARCHAR(255) DEFAULT NULL,
            payment_intent_id VARCHAR(255) DEFAULT NULL,
            client_secret VARCHAR(255) DEFAULT NULL,
            due_date VARCHAR(255) DEFAULT NULL,
            selections JSON DEFAULT NULL,
            subtotal VARCHAR(255) DEFAULT NULL,
            tax VARCHAR(255) DEFAULT NULL,
            amount_due VARCHAR(255) DEFAULT NULL,
            amount_remaining VARCHAR(255) DEFAULT NULL,
            PRIMARY KEY (id)
        ) $charset_collate;";

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
        payment_method_id VARCHAR(255) DEFAULT NULL,
        amount_paid VARCHAR(255) DEFAULT NULL,
        payment_date VARCHAR(255) DEFAULT NULL,
        balance VARCHAR(255) DEFAULT NULL,
        payment_method VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

        dbDelta($sql);
    }

    function create_accounts_receivable()
    {
        global $wpdb;
        $table_name = 'orb_accounts_receivable';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table_name} (
        id INT NOT NULL AUTO_INCREMENT,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        description VARCHAR(255) DEFAULT NULL,
        ref VARCHAR(255) DEFAULT NULL,
        debit VARCHAR(255) DEFAULT NULL,
        credit VARCHAR(255) DEFAULT NULL,
        balance VARCHAR(255) DEFAULT NULL,        
        PRIMARY KEY (id)
    ) $charset_collate;";

        dbDelta($sql);
    }
}

$orb_services_tables = new Tables();
