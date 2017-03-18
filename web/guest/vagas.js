var SysMap_VAGA_URL_PREFIX = "https://sysmapsolutions.github.io/vagas/{0}.json";

function SysMap_Vaga(codigo) {
	this.codigo = codigo;

	function vagaRetornada(){
		console.info(arguments);
	}

	$.ajax(SysMap_VAGA_URL_PREFIX.format(codigo)).done(vagaRetornada);

}

SysMap_Vaga.prototype.render = function() {

}

{
	var codigo = window.location.hash.substring(1);
	var vaga = new SysMap_Vaga(codigo);
	console.info(vaga);
}
