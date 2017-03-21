var SysMap_Analytics_TRACKER = "SysMap_Vagas";

SysMap_Analytics = (function () {

	ga("create", "UA-93986043-1", "auto", SysMap_Analytics_TRACKER);

	function enviar(comando, config){
		ga(SysMap_Analytics_TRACKER + "." + comando, config);
		console.debug(
			comando: comando,
			config: config
		);
	}

	function enviarVaga(){
		if(SysMap_Vaga.dados.nome){
			document.title = SysMap_Vaga.dados.nome + " - SysMap";
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
			eventAction: "vê vaga/" + SysMap_Vaga.codigo,
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
		enviar("set", {
			"userId": SysMap_Candidato.email
		});

		enviar("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: "preencheu e-mail na vaga/" + SysMap_Vaga.codigo,
			eventLabel: "candidato/" + SysMap_Candidato.email
		});
	}

	function enviarCandidatoSubmete(){
		enviar("set", {
			"userId": SysMap_Candidato.email
		});

		enviar("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: "se cadastra na vaga/" + SysMap_Vaga.codigo,
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
