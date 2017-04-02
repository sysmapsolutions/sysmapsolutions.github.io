SysMap_Candidato = (function () {
	this.email = "";
	this.dados = {};
	this.linkedin = {};

	function candidatoAutorizado(){
		this.email = "";
		this.dados = {};
		this.linkedin = {};

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

			SysMap_Candidato.email = value.emailAddress;

			var dados = {};

			dados.nome = value.formattedName;
			dados.localidade = (value.location)? value.location.name : null;
			dados.cargo = value.headline;
			dados.industria = value.industry;
			dados.foto = value.pictureUrl;
			dados.descricao = value.summary;
			dados.linkedin = (new URLParser(value.publicProfileUrl)).link.pathname;


			SysMap_Candidato.dados = dados;
			SysMap_Candidato.linkedin = value;
		}

		SysMap_Analytics.enviarCandidatoLinkedIn();
		SysMap_Candidato_UI.atualizar();
	}

	function carregar(){
		IN.Event.on(IN, "auth", candidatoAutorizado);
	}

	return {
		dados: dados,
		carregar: carregar
	}
})();

SysMap_Candidato_UI = (function () {
	function submeterEmail(){
		var email = $(this).val();
		if(email && email != SysMap_Candidato.email){
			SysMap_Candidato.email = email;
			SysMap_Analytics.enviarCandidatoEmail();
		}
	}

	function submeterFormulario(){
		var nome = $("#sm-candidato-nome").val();
		var email = $("#sm-candidato-email").val();
		var telefone = $("#sm-candidato-telefone").val();

		var erros = [];

		if(!nome){
			erros.push("Informe seu nome no formulário abaixo.");
		}

		if(!email){
			erros.push("Informe seu e-mail no formulário abaixo.");
		}else{
			if(!$("#sm-candidato-email").get(0).validity.valid){
				erros.push("Informe um e-mail válido: \"x@y.com.br\".");
			}
		}

		if(!telefone){
			erros.push("Informe seu telefone no formulário abaixo.");
		}else{
			if(!$("#sm-candidato-telefone").get(0).validity.valid){
				erros.push("Informe um telefone válido: \"11 999999999\".");
			}
		}

		if(erros.length > 0){
			$("#sm-candidato-form-erro")
			.html(erros.join("<br/>"))
			.show();
		}else{
			SysMap_Candidato.email = email;
			SysMap_Candidato.dados.nome = nome;
			SysMap_Candidato.dados.telefone = telefone;

			SysMap_Analytics.enviarCandidatoSubmete();

			var mensagem = "Registramos seu interesse nesta vaga!<br/>";

			if(SysMap_Vaga.dados && SysMap_Vaga.dados.contato.email){
				mensagem += "Por favor, nos envie seu CV no endereço <strong>" + SysMap_Vaga.dados.contato.email + "</strong>";
			}else{
				mensagem += "Por favor, nos envie seu CV no endereço <strong>rh@sysmap.com.br</strong>";
			}

			if(SysMap_Vaga.dados && SysMap_Vaga.dados.contato.assunto){
				mensagem += ", informando no assunto <strong>\"" + SysMap_Vaga.dados.contato.assunto + "\"</strong>";
			}
			mensagem += ".";

			$("#sm-candidato-form-erro")
			.html("")
			.hide();
			$("#sm-candidato-form-sucesso")
			.html(mensagem)
			.show();
			$(".sm-candidato-form form").hide();
		}

	}

	function iniciar(){
		$("#sm-candidato-email").focusout(submeterEmail);
		$("#sm-candidato-enviar").click(submeterFormulario);
	}

	function atualizarCampo(seletor, campo){
		if(campo == "email"){
			$(seletor).val(SysMap_Candidato.email);
		}else{
			$(seletor).val(SysMap_Candidato.dados[campo]);
		}
	}

	function atualizar(){
		atualizarCampo("#sm-candidato-nome", "nome");
		atualizarCampo("#sm-candidato-email", "email");
	}

	return {
		iniciar : iniciar,
		atualizar: atualizar
	}
})();

$(function() {
  SysMap_Candidato_UI.iniciar();
});
