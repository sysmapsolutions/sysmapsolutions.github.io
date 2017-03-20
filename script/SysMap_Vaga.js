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

	function atualizarLista(seletor, campo){
		var dados = SysMap_Vaga.dados[campo];

		var ultimoIndice = -1;
		var ultimoElemento;
		$(seletor).each(function(i){
			if(i < dados.length){
				ultimoIndice = i;
				ultimoElemento = $(this);
				ultimoElemento.html(dados[ultimoIndice]);
				ultimoElemento.show(0);
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


	function atualizar(){
		atualizarCampo("[class='sysmap-vaga-codigo']", "codigo");
		atualizarCampo("[class='sysmap-vaga-nome']", "nome");

		atualizarLista("[class='sysmap-vaga-descricao']", "descricao");
		atualizarLista("[class='sysmap-vaga-responsabilidades']", "responsabilidades");
		atualizarLista("[class='sysmap-vaga-experiencias']", "experiencias");
		atualizarLista("[class='sysmap-vaga-atributos']", "atributos");
	}

	return {
		atualizar: atualizar
	}
})();

{
	SysMap_Vaga.carregar(QueryString.codigo);
}
