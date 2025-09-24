<?php

$a = 2;
{
	$a = 5;
	$b = 'Hola';
}
echo $a, $b;

$a = 2;
if (true){
	$a = 5;
	$b = 'Hola';
}
echo $a, $b;