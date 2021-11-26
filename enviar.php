<?php
date_default_timezone_get('America/Sao_Paulo');

require_once('src/PHPMailer.php');
require_once('src/SMTP.php');
require_once('src/Exception.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$nome = isset($_POST['nome'])?$_POST['nome']:'Não Informado';
$loja = isset($_POST['loja'])?$_POST['loja']:'Não Informado';
$Pedido = isset($_POST['Pedido'])? trim($_POST['Pedido']):'Não Informado';
$Telefone = isset($_POST['Telefone'])? trim($_POST['Telefone']):'Não Informado';
$SelecioneAopção = isset($_POST['SelecioneAopção'])?$_POST['SelecioneAopção']:'Não Informado';
$SelecioneAopçãoArte = isset($_POST['SelecioneAopçãoArte'])?$_POST['SelecioneAopçãoArte']:'Não Informado';
$Frase = isset($_POST['Frase'])?$_POST['Frase']:'Não Informado';
$data = date('d/m/y H:i:S');

if($Pedido && $telefone){
$mail = new PHPMailer();
	$mail->isSMTP();
	$mail->Host = 'smtp.gmail.com';
	$mail->SMTPAuth = true;
	$mail->Username = 'rafamar@clickstock.com.br';
	$mail->Password = 'rafamar123!!';
	$mail->Port = 587;

	$mail->setFrom('rafamar@clickstock.com.br');
	$mail->addAddress('rafamar@clickstock.com.br');
	
	$mail->isHTML(true);
	$mail->Subject = '$Pedido';
	$mail->Body = "Nome:{$nome}<br>
                Pedido:{$Pedido}<br>
                Telefone:{$Telefone}<br>
                SelecioneAopção:{$SelecioneAopção}<br>
                SelecioneAopçãoArte:{$SelecioneAopçãoArte}<br>
                Frase:{$Frase}<br> 
                Data/hora:{$data}";

	if($mail->send()) {
		echo 'Pedido enviado com sucesso';
	} else {
		echo 'Pedido nao enviado';
	} else{
        echo 'Pedido não enviado: Informe o Número de Pedido e telefone '
    }
} catch (Exception $e) {
	echo "Erro ao enviar mensagem: {$mail->ErrorInfo}";
}
}