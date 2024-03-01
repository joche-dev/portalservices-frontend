export default function ImgPerfil({ name, img }) {
  function obtenerSiglas(nombre) {
    const palabras = nombre.split(' ');
    if (palabras.length == 1) {
      return palabras[0].charAt(0);
    }
    else if (palabras.length >= 2){
      return  palabras[0].charAt(0) + palabras[1].charAt(0);
    }
  }


  return (
    <>
      {img ? (
        <>
          Hola, {name}
          <img src={img} alt="Foto Perfil" className="foto-perfil rounded-circle ms-2"/>
        </>
      ) : (
        <>
          Hola, {name}
          <button className="foto-perfil rounded-circle ms-2">
            <h4 className="m-0">{obtenerSiglas(name)}</h4>
          </button>
        </>
      )}
    </>
  );
}
