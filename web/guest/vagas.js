var SysMap_VAGA_URL_PREFIX = "https://sysmapsolutions.github.io/vagas/{0}.json";

function SysMap_Vaga(codigo) {
	this.codigo = codigo;
	this.dados = {};

	function vagaRetornada(dados){
		this.dados = dados;
		SysMap_Analytics_sendPageview(vaga);
		this.render();
	}

	function vagaNaoRetornada(){
		SysMap_Analytics_sendPageview(vaga);
		console.debug(arguments);
	}

	$.ajax({
		url: SysMap_VAGA_URL_PREFIX.format(codigo),
		context: this
	}).done(vagaRetornada).fail(vagaNaoRetornada);

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

	SysMap_Analytics_sendEvent(this);

	this.bindField("[class='sysmap-vaga-codigo']", "Código");
	this.bindField("[class='sysmap-vaga-nome']", "Nome");

	this.bindList("[class='sysmap-vaga-descricao']", "Descrição");
	this.bindList("[class='sysmap-vaga-responsabilidades']", "Responsabilidades");
	this.bindList("[class='sysmap-vaga-experiencias']", "Educação e Experiências");
	this.bindList("[class='sysmap-vaga-atributos']", "Atributos Pessoais");
}

function SysMap_Analytics_sendPageview(vaga){
	if(vaga.dados["Nome"]){
		document.title = vaga.dados["Nome"] + " - SysMap";
	}

	var ga_page = "/vagas";
	if(vaga.codigo){
		ga_page += "/" + vaga.codigo;
	}

	ga("send", {
		hitType: "pageview",
		location: location.href,
		page: ga_page,
		title: document.title
	});
}

function SysMap_Analytics_sendEvent(vaga){
	ga("send", {
		hitType: "event",
		eventCategory: "SysMap Vagas",
		eventAction: "vaga/" + this.codigo
	});
}

function SysMap_LinkedIn_onLoad(){
	IN.Event.on(IN, "auth", SysMap_LinkedIn_userAuthorized);
}

function SysMap_LinkedIn_userAuthorized(){
	if(IN.User.isAuthorized()){
		IN.API.Profile("me")
		.fields(
			"id",
			"first-name",
			"last-name",
			"maiden-name",
			"formatted-name",
			"phonetic-first-name",
			"phonetic-last-name",
			"formatted-phonetic-name",
			"headline",
			"location",
			"industry",
			"current-share",
			"num-connections",
			"num-connections-capped",
			"summary",
			"specialties",
			"positions",
			"picture-url",
			"picture-urls::(original)",
			"site-standard-profile-request",
			"api-standard-profile-request",
			"public-profile-url",
			"email-address"
		)
		.result(SysMap_LinkedIn_profileRetrieved);
	}
}

function SysMap_LinkedIn_profileRetrieved(data){
	console.debug(dados);

	var dados = {};

	if(data.values && data.values.length > 0){
		var value = data.values[0];

		dados.nome = value.formattedName;
		dados.localidade = (value.location)? value.location.name : null;
		dados.descricao = value.summary;
		dados.url = value.publicProfileUrl;
	}
}

function SysMap_Candidato_Salvar(){
	var nome = $("#sysmap-candidato-nome").val();
	var email = $("#sysmap-candidato-email").val();
	var telefone = $("#sysmap-candidato-telefone").val();

	var erros = [];

	if(!nome){
		erros.push("Informe seu nome no formulário abaixo.");
	}

	if(!email){
		erros.push("Informe seu e-mail no formulário abaixo.");
	}

	if(!telefone){
		erros.push("Informe seu telefone no formulário abaixo.");
	}

	if(erros.length > 0){
		$("#sysmap-candidato-form-erros")
		.html(erros.join("<br/>"))
		.show();
	}else{
		$("#sysmap-candidato-form-erros")
		.html("")
		.hide();
	}
}

{
	var codigo = QueryString.codigo;
	var vaga = new SysMap_Vaga(codigo);

}
