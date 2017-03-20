var SysMap_VAGA_URL_PREFIX = "https://sysmapsolutions.github.io/vagas/{0}.json";

SysMap_Vaga = function () {
	this.codigo;
	this.dados = {};

	function vagaRetornada(dados){
		console.debug({
			this:this,
			arguments:arguments
		});
		this.dados = dados;
		SysMap_Analytics.enviarVaga();
	}

	function vagaNaoRetornada(){
		console.debug({
			this:this,
			arguments:arguments
		});
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
}();

{
	SysMap_Vaga.carregar(QueryString.codigo);
}
