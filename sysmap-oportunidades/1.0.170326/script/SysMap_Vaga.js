var SysMap_TEMPLATE_URL = "https://sysmapsolutions.github.io/sysmap-oportunidades/1.0.170326/template/{0}.mst";
var SysMap_Vaga_URL = "https://sysmapsolutions.github.io/vagas/{0}.json";

SysMap_Vaga = (function () {
	this.codigo = "";
	this.dados = {};

	function vagaRetornada(dados){
		this.dados = dados;
		SysMap_Analytics.enviarVaga();
		SysMap_Vaga_UI.atualizar();
	}

	function vagaNaoRetornada(){
		SysMap_Analytics.enviarVaga();
		SysMap_Vaga_UI.atualizar();
	}

	function carregar(codigo){
		this.codigo = codigo;
		this.dados = {};

		$.ajax({
			url: SysMap_Vaga_URL.format(codigo),
			context: this
		}).done(vagaRetornada).fail(vagaNaoRetornada);
	}

	return {
		carregar: carregar
	}
})();


SysMap_Vaga_UI = (function () {
	function atualizarVaga(template){
		var resultado = Mustache.render(template, SysMap_Vaga);
		$('#sm-conteudo').append(resultado);
	}

	function candidatar(event){
		event.preventDefault();

		window.location.hash='#';
		window.location.hash='#candidate-se';
	}


	function atualizar(){
		SysMap_Template("SysMap_Oportunidade", atualizarVaga);

		if(SysMap_Vaga.dados.nome){

			$(".s-page-title p").remove();

			var titulo = $(".s-page-title");
			$("<p>",{
				html: "Estamos à procura de um <strong>{0}</strong>.".format(SysMap_Vaga.dados.nome)
			}).appendTo(titulo);

			$("<a>",{
				class: "s-btn border-only",
				href: window.location.href.split("#")[0] + "#candidate-se",
				text: "Candidate-se",
				click: candidatar
			}).appendTo(titulo);

		}
	}

	return {
		atualizar: atualizar
	}
})();

{
	SysMap_Vaga.carregar(QueryString.codigo);
}
