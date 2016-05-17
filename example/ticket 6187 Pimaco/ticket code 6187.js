

// Quando temos um texto e queremos imprimir em todas as 80 etiqueta o mesmo nome
function sequencial(texto){

	var totalColuna = 4;
	var totalLinha  = 20;

	// Varremos todas colunas
	for(var i=1; i<=totalColuna; i++){

		// Varremos todas linhas
		for(var j=1; j<=totalLinha; j++){

			// Escrevemos na etiqueta
			linhaVsColuna(texto, j, i);
		}
	}

}

// Vamos reeber a texto linha e coluna para podermos fazer a impressão da etiqueta
function linhaVsColuna(texto, linha, coluna){

	// Caso a coluna for:
	switch(coluna){

		case 1: 
				if(linha == 1){ 	  			 	 setarTextoEtiqueta(texto, coluna01, altura); }
				if(linha>1 && linha<=6){  			 setarTextoEtiqueta(texto, coluna01,  (altura * linha) + (linha/2) ); } 				
				if(linha>6 && linha<=10){ 			 setarTextoEtiqueta(texto, coluna01,  (altura * linha) + (linha/1.5)); }
				if(linha>10 && linha<=numeroLinhas){ setarTextoEtiqueta(texto, coluna01,  (altura * linha) + (linha/1.7)); }
			break;
		
		case 2:
				if(linha == 1){ 	  			 	 setarTextoEtiqueta(texto, coluna02, altura); }
				if(linha>1 && linha<=6){  			 setarTextoEtiqueta(texto, coluna02,  (altura * linha) + (linha/2) ); } 				
				if(linha>6 && linha<=10){ 			 setarTextoEtiqueta(texto, coluna02,  (altura * linha) + (linha/1.5)); }
				if(linha>10 && linha<=numeroLinhas){ setarTextoEtiqueta(texto, coluna02,  (altura * linha) + (linha/1.7)); } 
			break;
		
		case 3:
				if(linha == 1){ 	  			 	 setarTextoEtiqueta(texto, coluna03, altura); }
				if(linha>1 && linha<=6){  			 setarTextoEtiqueta(texto, coluna03,  (altura * linha) + (linha/2) ); } 				
				if(linha>6 && linha<=10){ 			 setarTextoEtiqueta(texto, coluna03,  (altura * linha) + (linha/1.5)); }
				if(linha>10 && linha<=numeroLinhas){ setarTextoEtiqueta(texto, coluna03,  (altura * linha) + (linha/1.7)); }
			break;
		
		case 4:
				if(linha == 1){ 	  			 	 setarTextoEtiqueta(texto, coluna04, altura); }
				if(linha>1 && linha<=6){  			 setarTextoEtiqueta(texto, coluna04,  (altura * linha) + (linha/2) ); } 				
				if(linha>6 && linha<=10){ 			 setarTextoEtiqueta(texto, coluna04,  (altura * linha) + (linha/1.5)); }
				if(linha>10 && linha<=numeroLinhas){ setarTextoEtiqueta(texto, coluna04,  (altura * linha) + (linha/1.7)); }
			break;
	}
}	    	

function setarTextoEtiqueta(texto, marginEsquerda, marginSuperior){

	doc.text(texto, marginEsquerda,  marginSuperior, {height: altura, width:largura, align: 'center'} )
}

/*
	Adicionando os módulos necessários				
*/
var PDFDocument = require('pdfkit');                      
var fs 			= require('fs');		

/*	CRIAMOS O EXEMPLO DA PIMACO 6187 */

// Tamanhos das paginas que Pimaco trabalha (informações de acordo com Pimaco)
var papelCartaPimaco   = [215.90, 279.40];				

// Número de linha das etiquetas (informações de acordo com Pimaco)
var numeroLinhas = 20;			

// Tamanho da etiqueta (informações de acordo com Pimaco)
var altura  = 12.70;
var largura = 44.40;

// Espaçamento das colunas em mm
var coluna01 = 5.50;
var coluna02 = 58.00;
var coluna03 = 107.50;
var coluna04 = 157.00;

/*	
	Criamos a folha de acordo com as dimenssões dadas pela Pimaco
*/

doc = new PDFDocument({
	size: papelCartaPimaco,
	margins: {
    	top: 12.70,
    	bottom: 12.70, 	        	
    	left: 14.50,
    	right: 14.50
 	}
});			

// Escolhemos o tamanho da fonte
doc.fontSize(6);		

//Vamos popular com as etiquetas passando o nome, linha, coluna
linhaVsColuna('CIE', 2, 2);
linhaVsColuna('ANSELMO', 20, 2); 			

/*
	Vamos popular com as etiquetas passando o nome, linha, coluna
*/
linhaVsColuna('JANIO', 3, 2);
linhaVsColuna('ANSELMO', 4, 2);
linhaVsColuna('ANSELMO', 5, 2);
linhaVsColuna('ANSELMO', 6, 2);
linhaVsColuna('ANSELMO', 7, 2); 			

/*
	Caso eu queira imprimir nas 80 etiquetas o mesmo nome
*/
//sequencial('THIAGO');

/*
	Finaliza o PDF e gera ele;
*/			
doc.end();			

/*
   Utilizado para mostrar diretamente na tela o PDF
*/
doc.pipe(res);