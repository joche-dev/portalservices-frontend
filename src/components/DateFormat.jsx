export default function DateFormat({ fechaOriginal }) {
  const fecha = new Date(fechaOriginal);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();
  const fechaFormateada = `${dia < 10 ? '0' : ''}${dia}-${
    mes < 10 ? '0' : ''
  }${mes}-${anio}`;

  return <>{fechaFormateada}</>;
}
