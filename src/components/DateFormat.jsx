export default function DateFormat({ fechaOriginal }) {
  const [fechaParte, horaParte] = fechaOriginal.split('T');
  const fechaFormateada = fechaParte.split('-').reverse().join('-');
  
  return <>{fechaFormateada}</>;
}
