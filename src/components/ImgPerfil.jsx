

export default function ImgPerfil({imgPerfil}) {
 const defaultImgPerfil = '../perfil.png'

  return (
    <img src={imgPerfil || defaultImgPerfil} alt="img" className="border border-success rounded-circle ms-2" style={{width:'3.5rem', height:'3.5rem'}}/>
  )
}
