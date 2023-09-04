<?php

namespace ORB_Services\Database\Tables;

require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

class Tables
{

    public function __construct()
    {
        $this->create_services_table();
        $this->create_client_table();
        $this->create_quote_table();
        $this->create_invoice_table();
        $this->create_receipt_table();
        $this->create_accounts_receivable();
        $this->create_schedule_table();
        $this->create_communication_types_table();
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

    function create_quote_table()
    {
        global $wpdb;
        $table_name = 'orb_quote';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table_name} (
            id INT NOT NULL AUTO_INCREMENT,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            stripe_customer_id VARCHAR(255) DEFAULT NULL,
            stripe_quote_id VARCHAR(255) DEFAULT NULL,
            status VARCHAR(255) DEFAULT NULL,
            expires_at VARCHAR(255) DEFAULT NULL,
            selections JSON DEFAULT NULL,
            amount_subtotal VARCHAR(255) DEFAULT NULL,
            amount_discount VARCHAR(255) DEFAULT NULL,
            amount_shipping VARCHAR(255) DEFAULT NULL,
            amount_tax VARCHAR(255) DEFAULT NULL,
            amount_total VARCHAR(255) DEFAULT NULL,
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
            stripe_customer_id VARCHAR(255) DEFAULT NULL,
            quote_id VARCHAR(255) DEFAULT NULL,
            stripe_invoice_id VARCHAR(255) DEFAULT NULL,
            status VARCHAR(255) DEFAULT NULL,
            payment_intent_id VARCHAR(255) DEFAULT NULL,
            client_secret VARCHAR(255) DEFAULT NULL,
            due_date VARCHAR(255) DEFAULT NULL,
            subtotal VARCHAR(255) DEFAULT NULL,
            tax VARCHAR(255) DEFAULT NULL,
            amount_due VARCHAR(255) DEFAULT NULL,
            amount_remaining VARCHAR(255) DEFAULT NULL,
            invoice_pdf_url VARCHAR(255) DEFAULT NULL,
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
        stripe_customer_id VARCHAR(255) DEFAULT NULL,
        stripe_invoice_id VARCHAR(255) DEFAULT NULL,
        invoice_id VARCHAR(255) DEFAULT NULL,
        payment_method_id VARCHAR(255) DEFAULT NULL,
        amount_paid VARCHAR(255) DEFAULT NULL,
        payment_date VARCHAR(255) DEFAULT NULL,
        balance VARCHAR(255) DEFAULT NULL,
        payment_method VARCHAR(255) DEFAULT NULL,
        first_name VARCHAR(255) DEFAULT NULL,
        last_name VARCHAR(255) DEFAULT NULL,
        receipt_pdf_url VARCHAR(255) DEFAULT NULL,
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
        invoice_id VARCHAR(255) DEFAULT NULL,
        description VARCHAR(255) DEFAULT NULL,
        ref VARCHAR(255) DEFAULT NULL,
        debit VARCHAR(255) DEFAULT NULL,
        credit VARCHAR(255) DEFAULT NULL,
        balance VARCHAR(255) DEFAULT NULL,        
        PRIMARY KEY (id)
    ) $charset_collate;";

        dbDelta($sql);
    }

    function create_schedule_table()
    {
        global $wpdb;
        $table_name = 'orb_schedule';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table_name} (
        id INT NOT NULL AUTO_INCREMENT,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        client_id VARCHAR(255) DEFAULT NULL,
        summary VARCHAR(255) DEFAULT NULL,
        description VARCHAR(255) DEFAULT NULL,
        google_event_id VARCHAR(255) DEFAULT NULL,
        start_date VARCHAR(255) DEFAULT NULL,
        start_time VARCHAR(255) DEFAULT NULL,
        calendar_link VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

        dbDelta($sql);
    }

    function create_communication_types_table()
    {
        global $wpdb;
        $table_name = 'orb_communication_types';
        $charset_collate = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE {$table_name} (
        id INT NOT NULL AUTO_INCREMENT,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        type VARCHAR(255) DEFAULT NULL,
        contact_info VARCHAR(255) DEFAULT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

        dbDelta($sql);
    }
}
