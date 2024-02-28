export default function ImgPerfil({ name, img }) {

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
            <h4 className="m-0">{name.charAt(0).toUpperCase()}</h4>
          </button>
        </>
      )}
    </>
  );
}
