<?php

namespace ORB_Products_Services\Email;

use Exception;

class Email
{
    private $web_address;
    private $logo_link;
    private $site_name;
    private $facebook;
    private $twitter;
    private $contact_email;
    private $linkedin;
    private $instagram;
    private $year;
    private $company_name;
    private $emailTemplateHeader;
    private $emailTemplateFooter;

    public function __construct()
    {
        $custom_logo_id = get_theme_mod('custom_logo');
        $logo = wp_get_attachment_image_src($custom_logo_id, 'full');
        $this->web_address = esc_url(home_url());
        $this->logo_link = esc_url($logo[0]);
        $this->site_name = get_bloginfo('name');

        $this->facebook = esc_attr(get_option('facebook_link'));
        $this->twitter = esc_attr(get_option('twitter_link'));
        $this->contact_email = esc_attr(get_option('contact_email'));
        $this->linkedin = esc_attr(get_option('linkedin_link'));
        $this->instagram = esc_attr(get_option('instagram_link'));
        $this->year = date("Y");
        $this->company_name = get_theme_mod('footer_company');

        $this->emailTemplateHeader = ORB_PRODUCTS_SERVICES . 'Templates/TemplatesEmailHeader.php';
        $this->emailTemplateFooter = ORB_PRODUCTS_SERVICES . 'Templates/TemplatesEmailFooter.php';
    }

    public function emailHeader()
    {
        $swap_var = array(
            "{WEB_ADDRESS}" => $this->web_address,
            "{LOGO_LINK}" => $this->logo_link,
            "{SITE_NAME}" => $this->site_name,
        );

        if (file_exists($this->emailTemplateHeader)) {
            $header = file_get_contents($this->emailTemplateHeader);

            foreach (array_keys($swap_var) as $key) {
                if (strlen($key) > 2 && trim($key) != '') {
                    $header = str_replace($key, $swap_var[$key], $header);
                }
            }

            return $header;
        } else {
            throw new Exception('Unable to locate contact email template.');
        }
    }

    public function emailFooter()
    {
        $swap_var = array(
            "{FACEBOOK}" => $this->facebook,
            "{TWITTER}" => $this->twitter,
            "{CONTACT_EMAIL}" => $this->contact_email,
            "{LINKEDIN}" => $this->linkedin,
            "{INSTAGRAM}" => $this->instagram,
            "{YEAR}" => $this->year,
            "{COMPANY_NAME}" => $this->company_name
        );

        if (file_exists( $this->emailTemplateFooter)) {
            $footer = file_get_contents( $this->emailTemplateFooter);

            foreach (array_keys($swap_var) as $key) {
                if (strlen($key) > 2 && trim($key) != '') {
                    $footer = str_replace($key, $swap_var[$key], $footer);
                }
            }

            return $footer;
        } else {
            throw new Exception('Unable to locate contact email template.');
        }
    }
}
