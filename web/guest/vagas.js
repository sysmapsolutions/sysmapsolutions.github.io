var SysMap_VAGA_URL_PREFIX = "https://sysmapsolutions.github.io/vagas/{0}.json";

function SysMap_Vaga(codigo) {
	this.codigo = codigo;

	function vagaRetornada(dados){
		this.dados = dados;
		console.info(this);
	}

	$.ajax({
		url: SysMap_VAGA_URL_PREFIX.format(codigo),
		context: this
	}).done(vagaRetornada);

}

SysMap_Vaga.prototype.render = function() {

}

{
	var codigo = window.location.hash.substring(1);
	var vaga = new SysMap_Vaga(codigo);
}
