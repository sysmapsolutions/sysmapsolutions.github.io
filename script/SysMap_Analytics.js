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
			eventAction: "candidato/" + SysMap_Candidato.email + " vê " + "vaga/" + SysMap_Vaga.codigo
		});
	}

	function enviarCandidatoLinkedIn(){
		ga("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: "candidato/" + SysMap_Candidato.email + " entrou com LinkedIn na " + "vaga/" + SysMap_Vaga.codigo
		});
	}

	function enviarCandidatoEmail(){
		ga("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: "candidato/" + SysMap_Candidato.email + " preencheu e-mail na " + "vaga/" + SysMap_Vaga.codigo
		});
	}

	function enviarCandidatoSubmete(){
		ga("send", {
			hitType: "event",
			eventCategory: "SysMap Vagas",
			eventAction: "candidato/" + SysMap_Candidato.email + " se cadastra na " + "vaga/" + SysMap_Vaga.codigo
		});
	}

	return {
		enviarVaga: enviarVaga,
		enviarCandidatoLinkedIn: enviarCandidatoLinkedIn,
		enviarCandidatoEmail: enviarCandidatoEmail,
		enviarCandidatoSubmete: enviarCandidatoSubmete
	}
})();
