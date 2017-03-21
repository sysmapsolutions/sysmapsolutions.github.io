var SysMap_Analytics_TRACKER = "SysMap_Vagas";

SysMap_Analytics = (function () {

	ga("create", "UA-93986043-1", "auto", SysMap_Analytics_TRACKER);

	function enviar(comando, config){
		ga(SysMap_Analytics_TRACKER + "." + comando, config);
		console.debug({
			comando: comando,
			config: config
		});
	}

	function enviarEvento(acao, texto){
		enviar("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: acao,
			eventLabel: texto
		});
	}

	function enviarEventoDados(acao){
		var texto;

		if(SysMap_Candidato.email){
			enviar("set", {
				"userId": SysMap_Candidato.email
			});

			texto = SysMap_Analytics.id + "/email/" + SysMap_Candidato.email;
			enviarEvento(acao, texto);
		}
		if(SysMap_Candidato.dados){
			if(SysMap_Candidato.dados.nome){
				texto = SysMap_Analytics.id + "/nome/" + SysMap_Candidato.nome;
				enviarEvento(acao, texto);
			}
			if(SysMap_Candidato.dados.telefone){
				texto = SysMap_Analytics.id + "/telefone/" + SysMap_Candidato.telefone;
				enviarEvento(acao, texto);
			}
			if(SysMap_Candidato.dados.linkedin){
				texto = SysMap_Analytics.id + "/linkedin" + SysMap_Candidato.linkedin;
				enviarEvento(acao, texto);
			}
		}
		if(!texto){
			enviarEvento(acao);
		}
	}

	function enviarVaga(){
		if(SysMap_Vaga.dados.nome){
			document.title = SysMap_Vaga.dados.nome + " (#" + SysMap_Vaga.codigo + ") - SysMap";
		}else{
			document.title = "Erro: Vaga Não Encontrada - SysMap";
		}

		var pagina = "/vagas";
		if(SysMap_Vaga.codigo){
			pagina += "/" + SysMap_Vaga.codigo;
		}

		enviar("send", {
			hitType: "pageview",
			location: location.href,
			page: pagina,
			title: document.title
		});
	}

	function enviarCandidatoVeVaga(){
		enviar("set", {
			"userId": SysMap_Candidato.email
		});

		enviar("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: "viu vaga/" + SysMap_Vaga.codigo,
			eventLabel: "candidato/" + SysMap_Candidato.email
		});
	}

	function enviarCandidatoLinkedIn(){
		enviar("set", {
			"userId": SysMap_Candidato.email
		});

		enviar("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: "entrou com LinkedIn na vaga/" + SysMap_Vaga.codigo,
			eventLabel: "candidato/" + SysMap_Candidato.email
		});
	}

	function enviarCandidatoEmail(){
		var acao = "preencheu e-mail na vaga/" + SysMap_Vaga.codigo;
		enviarEventoDados(acao);
	}

	function enviarCandidatoSubmete(){
		enviar("set", {
			"userId": SysMap_Candidato.email
		});

		enviar("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: "se cadastrou na vaga/" + SysMap_Vaga.codigo,
			eventLabel: "candidato/" + SysMap_Candidato.email
		});
	}

	return {
		enviarVaga: enviarVaga,
		enviarCandidatoLinkedIn: enviarCandidatoLinkedIn,
		enviarCandidatoEmail: enviarCandidatoEmail,
		enviarCandidatoSubmete: enviarCandidatoSubmete
	}
})();

ga(function(tracker) {
	SysMap_Analytics.id = tracker.get('clientId');
});
