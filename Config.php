<?php
$WebsiteURL = "http://134.255.221.122";
if(in_array("www", (explode(".",$_SERVER['HTTP_HOST']))))
{
    if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && ($_SERVER['X-Forwarded-Proto'] == 'https')) {
        $WebsiteURL = "http://134.255.221.122";
    }
    else
    {
        $WebsiteURL = "http://134.255.221.122";
    }
}
else
{
    if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&($_SERVER['X-Forwarded-Proto'] == 'https')) {
        $WebsiteURL = "http://134.255.221.122";
    }
    else
    {
        $WebsiteURL = "http://134.255.221.122";
    }
}
class Config
{

	/**
	* Config
	*
	* Config of Website
    * full modify
	*
	* @version 1.0
	* @author Flow
	*/



	public $Name = "NosDecu";
    public $LogoDescription = "The Amazing Online Anim� RPG (PServer)";

    public $FirstHeader = "Become a Part of NosDecu";

    public $FirstFeatureList1 = "Anime Action MMORPG";
    public $FirstFeatureList2 = "An active community";
    public $FirstFeatureList3 = "Minimal system requirements for PCs / notebooks";
    public $FirstFeatureList4 = "Free-to-Play - get straight into the action";

    public $SecondHeader = "Choose Your Path";

    public $SecondFeatureList1 = "Master the elements as a Swordsman, Archer or Mage";
    public $SecondFeatureList2 = "Play one of 28 fantastic specialist classes";
    public $SecondFeatureList3 = "Enjoy exciting action in PvP, PvE and raids";
    public $SecondFeatureList4 = "Tame pets and dive into battle with them";

    public $DescriptionHeader = "Your Heroic Saga Starts Today!";

    public $Description = "On your journey through the world of NosDecu, you'll feel how the once idyllic continents have changed. An ominous shadow looms large over every town and creature in these lands. Take up your weapon, battle your way through countless challenging missions, and rescue the people from this evil!";

    public $YTVideo = "https://youtu.be/JYOCI8KmfSM";
    public $YTVideoID = "JYOCI8KmfSM";

    public $CaptchaPublicKey = "";
    public $CaptchaPrivateKey = "";


    public $DBHOST = "localhost";
    public $DBUSER = "";
    public $DBPW = "";
    public $DBSCHEMA = "opennos";

}

$Config = new Config();
?>