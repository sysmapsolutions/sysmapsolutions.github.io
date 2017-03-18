function SysMap_Vaga(codigo) {
	this.codigo = codigo;
}

SysMap_Vaga.prototype.render = function() {

}

{
	var codigo = window.location.hash.substring(1);
	var vaga = new SysMap_Vaga(codigo);
	console.debug(vaga);
}
