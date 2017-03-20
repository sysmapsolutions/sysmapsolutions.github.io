SysMap_Candidato = (function () {
	this.email;
	this.dados = {};

	function candidatoAutorizado(){
		this.email = undefined;
		this.dados = {};

		if(IN.User.isAuthorized()){
			IN.API.Profile("me")
			.fields(
				"id",
				"formatted-name",
				"headline",
				"location",
				"industry",
				"summary",
				"picture-url",
				"public-profile-url",
				"email-address"
			)
			.result(candidatoRetornado);
		}
	}

	function candidatoRetornado(data){

		if(data.values && data.values.length > 0){
			var value = data.values[0];

			var dados = {};

			dados.nome = value.formattedName;
			dados.email = value.emailAddress;
			dados.localidade = (value.location)? value.location.name : null;
			dados.cargo = value.headline;
			dados.industria = value.industry;
			dados.foto = value.pictureUrl;
			dados.descricao = value.summary;
			dados.perfil = (new URLParser(value.publicProfileUrl)).link.pathname;

			SysMap_Candidato.dados = dados;
		}

		console.debug({
			this: SysMap_Candidato,
			arguments: arguments
		});
	}

	function carregar(){
		IN.Event.on(IN, "auth", candidatoAutorizado);
	}

	return {
		carregar: carregar
	}
})();

SysMap_Candidato_UI = (function () {

	function atualizarCampo(seletor, campo){
		$(seletor).val(SysMap_Candidato.dados[campo]);
	}

	function atualizar(){
		atualizarCampo("#sysmap-candidato-nome", "nome");
		atualizarCampo("#sysmap-candidato-email", "email");
	}

	return {
		atualizar: atualizar
	}
})();
