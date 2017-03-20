SysMap_Analytics = (function () {

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

		ga("send", {
			hitType: "pageview",
			location: location.href,
			page: pagina,
			title: document.title
		});
	}

	function enviarCandidatoVeVaga(){
		ga("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: "vê vaga/" + SysMap_Vaga.codigo,
			eventLabel: "candidato/" + SysMap_Candidato.email
		});
	}

	function enviarCandidatoLinkedIn(){
		ga("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: "entrou com LinkedIn na vaga/" + SysMap_Vaga.codigo,
			eventLabel: "candidato/" + SysMap_Candidato.email
		});
	}

	function enviarCandidatoEmail(){
		ga("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: "preencheu e-mail na vaga/" + SysMap_Vaga.codigo,
			eventLabel: "candidato/" + SysMap_Candidato.email
		});
	}

	function enviarCandidatoSubmete(){
		ga("send", {
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
