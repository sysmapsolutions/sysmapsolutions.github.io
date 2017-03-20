var SysMap_VAGA_URL_PREFIX = "https://sysmapsolutions.github.io/vagas/{0}.json";

function SysMap_Vaga(codigo) {
	this.codigo = codigo;
	this.dados = {};

	function vagaRetornada(dados){
		this.dados = dados;
		this.render();
	}

	$.ajax({
		url: SysMap_VAGA_URL_PREFIX.format(codigo),
		context: this
	}).done(vagaRetornada);

}

SysMap_Vaga.prototype.bindField = function(seletor, campo){
	$(seletor).html(this.dados[campo]);
}

SysMap_Vaga.prototype.bindList = function(seletor, campo){
	var dados = this.dados[campo];

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

SysMap_Vaga.prototype.render = function() {
	/*
	Google_Tag.push({
		"event": "sysmap-vaga-visualizada",
		"sysmap-vaga-codigo": this.codigo,
		"sysmap-vaga-nome": this.dados["Nome"]
	});
	*/

	SysMap_Analytics_send(this);

	ga("send", {
		hitType: "event",
		eventCategory: "SysMap Vagas",
		eventAction: "ver",
		eventLabel: "vaga/" + this.codigo
	});

	this.bindField("[class='sysmap-vaga-codigo']", "Código");
	this.bindField("[class='sysmap-vaga-nome']", "Nome");

	this.bindList("[class='sysmap-vaga-descricao']", "Descrição");
	this.bindList("[class='sysmap-vaga-responsabilidades']", "Responsabilidades");
	this.bindList("[class='sysmap-vaga-experiencias']", "Educação e Experiências");
	this.bindList("[class='sysmap-vaga-atributos']", "Atributos Pessoais");
}

function SysMap_Analytics_send(vaga){
	var page = "/vagas";
	if(codigo){
		page += "/" + vaga.codigo;
	}

	ga("send", {
		hitType: "pageview",
		location: location.href,
		page: page,
		title: vaga.dados["Nome"]
	});
}

{
	var codigo = QueryString.codigo;
	var vaga = new SysMap_Vaga(codigo);
	SysMap_Analytics_send(vaga);
}
