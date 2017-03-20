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

	return {
		enviarVaga: enviarVaga
	}
})();
