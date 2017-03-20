SysMap_Analytics = (function () {

	function enviarVaga(){
		if(SysMap_Vaga.dados["Nome"]){
			document.title = SysMap_Vaga.dados["Nome"] + " - SysMap";
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
		console.debug({
			this:this,
			arguments:arguments
		});
	}

	return {
		enviarVaga: enviarVaga
	}
})();
