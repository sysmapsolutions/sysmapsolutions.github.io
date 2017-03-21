SysMap_Candidato = (function () {
	this.email;
	this.dados = {};
	this.linkedin = {};

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

			dados.email = value.emailAddress;
			dados.nome = value.formattedName;
			dados.localidade = (value.location)? value.location.name : null;
			dados.cargo = value.headline;
			dados.industria = value.industry;
			dados.foto = value.pictureUrl;
			dados.descricao = value.summary;
			dados.perfil = (new URLParser(value.publicProfileUrl)).link.pathname;

			SysMap_Candidato.email = dados.email;
			SysMap_Candidato.dados = dados;
			SysMap_Candidato.linkedin = value;
		}

		SysMap_Analytics.enviarCandidatoLinkedIn();
		SysMap_Candidato_UI.atualizar();
		console.debug(SysMap_Candidato);
	}

	function carregar(){
		IN.Event.on(IN, "auth", candidatoAutorizado);
	}

	return {
		email: email,
		dados: dados,
		linkedin: linkedin,
		carregar: carregar
	}
})();

SysMap_Candidato_UI = (function () {

	function iniciar(){
		$("#sysmap-candidato-email").focusout(function(){
			var email = $(this).val();
			if(email != SysMap_Candidato.email){
				SysMap_Candidato.email = email;
				SysMap_Candidato.dados.email = email;
				SysMap_Analytics.enviarCandidatoEmail();
			}
		});
	}

	function atualizarCampo(seletor, campo){
		$(seletor).val(SysMap_Candidato.dados[campo]);
	}

	function atualizar(){
		atualizarCampo("#sysmap-candidato-nome", "nome");
		atualizarCampo("#sysmap-candidato-email", "email");
	}

	return {
		iniciar : iniciar,
		atualizar: atualizar
	}
})();

$(function() {
  SysMap_Candidato_UI.iniciar();
});
