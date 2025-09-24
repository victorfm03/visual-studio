<?php

function contar(){
	static $num = 0;
	$num++;
	echo '<p>', $num,'</p>';
}

contar(); //imprime 1
contar(); //imprime 2
contar(); //imprime 3