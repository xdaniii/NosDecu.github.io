﻿<?php
include_once $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';

include_once $_SERVER['DOCUMENT_ROOT'].'/config/recaptchalib.php';


include_once  $_SERVER['DOCUMENT_ROOT'].'/Config.php';
require  $_SERVER['DOCUMENT_ROOT'].'/vendor/phpmailer/phpmailer/src/Exception.php';
require  $_SERVER['DOCUMENT_ROOT'].'/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require  $_SERVER['DOCUMENT_ROOT'].'/vendor/phpmailer/phpmailer/src/SMTP.php';

use Medoo\Medoo;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

function Register($array){
		$captcha;
		$Config = new Config();
		if(isset($array['g-recaptcha-response'])){
          $captcha= $array['g-recaptcha-response'];
        }
		if(!$captcha){
			echo '<meta http-equiv="refresh" content="0; url=../index.php?reg=wrong_captcha" />';
		}
		$ip = $_SERVER['REMOTE_ADDR'];
		$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$Config->CaptchaPrivateKey."&response=".$captcha."&remoteip=".$ip);
        $responseKeys = json_decode($response,true);
		
		if(intval($responseKeys['success']) !== 1){
			echo '<meta http-equiv="refresh" content="0; url=../index.php?reg=wrong_captcha" />';
		}
		else
		{
			
			$username = $array['username'];
			$password = $array['password'];
			$email = $array['email'];


			$database = new Medoo(array('database_type' => 'mssql','database_name' => $Config->DBSCHEMA ,'server' => $Config->DBHOST ,'username' => $Config->DBUSER ,'password' => $Config->DBPW , 'option' => [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION] ));
			$count = $database->count("Account",["Name"],
						   ["Name" => $username]);
			if($count == 0){
				$query = $database->insert('Account',[
					"Name" => $username,
					"Password" => strtoupper(hash('sha512',$password)),
					"Email" => $email,
					"Authority" => "0",
					"VerificationToken" => "yes",
					"RegistrationIP" => $_SERVER['REMOTE_ADDR']
					]);

				if($query->errorCode() == "00000")
				{
					echo '<meta http-equiv="refresh" content="0; url=../index.php?reg=success" />';
				}

				else
				{
					echo $query->errorInfo();
				}
			}
			else {
				echo '<meta http-equiv="refresh" content="0; url=../index.php?reg=fail" />';
			}
		}
        
}

function Database($type, $username){
	$Config = new Config();
	$database = new Medoo(array('database_type' => 'mssql','database_name' => $Config->DBSCHEMA ,'server' => $Config->DBHOST ,'username' => $Config->DBUSER ,'password' => $Config->DBPW , 'option' => [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION] ));
	switch($type){
		case '0': //Check Username
			{
				$count = $database->count("Account",["Name"],
					["Name" => $username]);
				if($count > 0){
					echo 'This account name is already in use . Suggested account name: {'.$username.str_pad(mt_rand(0, 999999), 6, '0', STR_PAD_LEFT).'}';
				}
				else
				{
					echo '';
				}
			}
			break;
		case "1": //Ranking Level
			{
				$row = $database->select("Character",["[>]Account"=> ["AccountId" => "AccountId"],],["Character.Class","Character.Name", "Character.Level", "Character.JobLevel"],[ "AND" =>["Account.Authority[<]" =>"1", "Account.Authority[!]" => "-1"], "ORDER" => ["Level" => "DESC"], "LIMIT" => 10]);
				$class ='';
				echo '
			<div id="ranking" class="clearfix">
						<table>
						<colgroup>
							<col class="name" />
							<col class="level" />
							<col class="joblevel" />
							<col class="Class" />
						</colgroup>
						<thead>
							<tr>
								<td>Name</td>
								<td>Level</td>
								<td>Job Level</td>
								<td>Class</td>
							</tr>
						</thead>
						<tbody>
								';
								
				foreach($row as $char)
				{
					switch($char["Class"]){
						case "0":
							$Class = "Adventure";
							break;
						case "1":
							$Class = "Swordsman";
							break;
						case "2":
							$Class = "Archer";
							break;
						case "3":
							$Class = "Mage";
							break;
					}

					echo "<tr>\n";
					echo iconv('Latin1', 'Latin1', "									<td>".$char["Name"]."</td>\n");
					echo "									<td>".$char["Level"]."</td>\n";
					echo "									<td>".$char["JobLevel"]."</td>\n";
					echo "									<td>".$Class."</td>\n";
					echo "								</tr>\n";
				}
				
				echo '</tbody>
					</table>
					</div>
							';
					
			}
			break;
		case "2": //Ranking Reputation
			{
				$row = $database->select("Character",["[>]Account"=> ["AccountId" => "AccountId"],],["Character.Class","Character.Name", "Character.Level", "Character.Reputation"],[ "AND" =>["Account.Authority[<]" =>"1", "Account.Authority[!]" => "-1"], "ORDER" => ["Reputation" => "DESC"],"LIMIT" => 10]);
				$class ='';

				echo '
			<div id="ranking" class="clearfix">
					<table>
					<colgroup>
						<col class="name" />
						<col class="rep" />
						<col class="level" />
						<col class="Class" />
					</colgroup>
					<thead>
						<tr>
							<td>Name</td>
							<td>Reputation</td>
							<td>Level</td>
							<td>Class</td>
						</tr>
					</thead>
					<tbody>
						';
						
				foreach($row as $char){
					switch($char["Class"]){
						case "0":
							$class = "Adventure";
							break;
						case "1":
							$class = "Swordsman";
							break;
						case "2":
							$class = "Archer";
							break;
						case "3":
							$class = "Mage";
							break;
					}
					
					echo "<tr>\n";
					echo iconv('Latin1', 'Latin1', "									<td>".$char["Name"]."</td>\n");
					echo "									<td>".$char["Reputation"]."</td>\n";
					echo "									<td>".$char["Level"]."</td>\n";
					echo "									<td>".$class."</td>\n";
					echo "								</tr>\n";
				}
				
				echo "</tbody>
				</table>
				</div>";
					
			}
			break;
			
	}

}
?>