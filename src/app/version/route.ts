// Para qué sirve: dice con qué commit se construyó esta web. El pipeline de despliegue lo consulta
// para saber que la versión nueva ya corre en staging o producción (un 200 en «/» también lo daría
// la versión anterior). El valor se fija al compilar con el argumento COMMIT_SHA de la imagen de Docker.
export function GET() {
  return Response.json({ commit: process.env.COMMIT_SHA ?? "desconocido" });
}
