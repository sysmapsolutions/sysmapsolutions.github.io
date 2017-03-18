var SysMap_VAGA_URL_PREFIX = "https://sysmapsolutions.github.io/vagas/{0}.json";

function SysMap_Vaga(codigo) {
	this.codigo = codigo;

	function vagaRetornada(dados){
		this.dados = dados;
		console.debug(this);

		this.render();
	}

	$.ajax({
		url: SysMap_VAGA_URL_PREFIX.format(codigo),
		context: this
	}).done(vagaRetornada);

}

SysMap_Vaga.prototype.render = function() {
	$("[class='sysmap-vaga-nome']").html(this.dados["Nome"]);

	var dados = this.dados["Descrição"];

	var ultimoIndice = -1;
	var ultimoElemento;
	$("[class='sysmap-vaga-descricao']").each(function(i){
		if(i < dados.length){
			ultimoIndice = i;
			ultimoElemento = $(this);
			ultimoElemento.html(dados[ultimoIndice]);
		}else{
			$(this).hide(0);
		}
	});

	if(ultimoIndice >= 0){
		while(ultimoIndice < dados.length - 1){
			ultimoIndice++;
			var clone = ultimoElemento.clone();
			clone.html(dados[ultimoIndice]);
			ultimoElemento.after(clone);
			ultimoElemento = clone;
		}
	}
}

{
	var codigo = window.location.hash.substring(1);
	var vaga = new SysMap_Vaga(codigo);
}
