var SysMap_Analytics_TRACKER = "SysMap_Vagas";

SysMap_Analytics = (function () {
	this.id = "";

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
				texto = SysMap_Analytics.id + "/nome/" + SysMap_Candidato.dados.nome;
				enviarEvento(acao, texto);
			}
			if(SysMap_Candidato.dados.telefone){
				texto = SysMap_Analytics.id + "/telefone/" + SysMap_Candidato.dados.telefone;
				enviarEvento(acao, texto);
			}
			if(SysMap_Candidato.dados.linkedin){
				texto = SysMap_Analytics.id + "/linkedin" + SysMap_Candidato.dados.linkedin;
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

		if(SysMap_Vaga.codigo){
			enviar("set", {
				"page": "/vagas/" + SysMap_Vaga.codigo;
			});
		}else{
			enviar("set", {
				"location": location.href
			});
		}

		enviar("send", {
			hitType: "pageview",
			title: document.title
		});
	}

	function enviarCandidatoVeVaga(){
		var acao = "viu vaga/" + SysMap_Vaga.codigo;
		enviarEventoDados(acao);
	}

	function enviarCandidatoLinkedIn(){
		var acao = "entrou com LinkedIn na vaga/" + SysMap_Vaga.codigo;
		enviarEventoDados(acao);
	}

	function enviarCandidatoEmail(){
		var acao = "preencheu e-mail na vaga/" + SysMap_Vaga.codigo;
		enviarEventoDados(acao);
	}

	function enviarCandidatoSubmete(){
		var acao = "se cadastrou na vaga/" + SysMap_Vaga.codigo;
		enviarEventoDados(acao);
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
