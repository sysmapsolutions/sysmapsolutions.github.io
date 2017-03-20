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

	function candidatoRetornado(){
			console.debug({
				this: this,
				arguments: argments
			});
/*
			if(data.values && data.values.length > 0){
				var value = data.values[0];

				dados.nome = value.formattedName;
				dados.email = value.emailAddress;
				dados.localidade = (value.location)? value.location.name : null;
				dados.cargo = value.headline;
				dados.industria = value.industry;
				dados.foto = value.pictureUrl;
				dados.descricao = value.summary;
				dados.perfil = (new URLParser(value.publicProfileUrl)).link.pathname;
*/
	}

	function carregar(){
		IN.Event.on(IN, "auth", usuarioAutorizado);
	}

	return {
		carregar: carregar
	}
})();
