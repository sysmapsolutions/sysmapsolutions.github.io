var SysMap_VAGA_URL_PREFIX = "https://sysmapsolutions.github.io/vagas/{0}.json";

SysMap_Vaga = (function () {
	this.codigo;
	this.dados = {};

	function vagaRetornada(dados){
		SysMap_Analytics.enviarVaga();
		this.dados = dados;
		SysMap_Vaga_UI.atualizar();
	}

	function vagaNaoRetornada(){
		SysMap_Analytics.enviarVaga();
	}

	function carregar(codigo){
		this.codigo = codigo;
		this.dados = {};

		$.ajax({
			url: SysMap_VAGA_URL_PREFIX.format(codigo),
			context: this
		}).done(vagaRetornada).fail(vagaNaoRetornada);
	}

	return {
		carregar: carregar
	}
})();


SysMap_Vaga_UI = (function () {
	function atualizarCampo(seletor, campo){
		$(seletor).html(SysMap_Vaga.dados[campo]);
	}


	function atualizar(){
		console.debug({
			this:this,
			arguments:arguments
		});

		atualizarCampo("[class='sysmap-vaga-codigo']", "codigo");
		atualizarCampo("[class='sysmap-vaga-nome']", "nome");
/*
		this.bindList("[class='sysmap-vaga-descricao']", "Descrição");
		this.bindList("[class='sysmap-vaga-responsabilidades']", "Responsabilidades");
		this.bindList("[class='sysmap-vaga-experiencias']", "Educação e Experiências");
		this.bindList("[class='sysmap-vaga-atributos']", "Atributos Pessoais");
*/
	}

	return {
		atualizar: atualizar
	}
})();

{
	SysMap_Vaga.carregar(QueryString.codigo);
}
