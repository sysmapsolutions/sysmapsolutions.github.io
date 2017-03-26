document.write("<div id='sm-conteudo' class='page-container page-internal oportunidades'/> ");

$.get("template.mst", function(template) {
	var vaga = {
		dados: {
			codigo: "1000",
			nome: "Consultor Técnico de Pré-Venda"
		}
	};

	var resultado = Mustache.render(template, vaga);
	$('#sm-conteudo').html(resultado);
});
