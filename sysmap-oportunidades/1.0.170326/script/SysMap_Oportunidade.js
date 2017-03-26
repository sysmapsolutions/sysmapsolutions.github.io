var SysMap_SCRIPT_URL = "https://sysmapsolutions.github.io/sysmap-oportunidades/1.0.170326/script/";
var SysMap_TEMPLATE_URL = "https://sysmapsolutions.github.io/sysmap-oportunidades/1.0.170326/template/";

function SysMap_Template(nome){
	return SysMap_TEMPLATE_URL + nome + ".mst";
}

document.write("<div id='sm-conteudo' class='page-container page-internal oportunidades'/> ");

$.get(SysMap_Template("SysMap_Oportunidade"), function(template) {
	var vaga = {
		dados: {
			codigo: "1000",
			nome: "Consultor Técnico de Pré-Venda"
		}
	};

	var resultado = Mustache.render(template, vaga);
	$('#sm-conteudo').html(resultado);
});
