<?php

namespace ORB_Services\PDF;

use Mpdf\Mpdf;

class PDF
{
    private $mpdf;

    public function __construct()
    {
        $this->mpdf = new Mpdf();
    }

    public function createPDF($htmlFilePath, $name, $dest)
    {
        $html = file_get_contents($htmlFilePath);

        $this->mpdf->WriteHTML($html);

        $pdf = $this->mpdf->Output($name, $dest);

        return $pdf;
    }
}
