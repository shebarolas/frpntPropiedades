import moment from "moment";

export function formatPrice(number) {
  const formatter = new Intl.NumberFormat("es-ES");

  return formatter.format(number);
}

export function calculateDistanceBetweenPoints(point1, point2) {
  if (!point1) {
    return 0;
  }
  const R = 6371;
  const toRadians = (degree) => (degree * Math.PI) / 180;

  const { latitude: lat1, longitude: lon1 } = point1;
  const { latitude: lat2, longitude: lon2 } = point2;

  const p1 = toRadians(lat1);
  const p2 = toRadians(lat2);
  const deltaP = p2 - p1;
  const deltaLon = lon2 - lon1;
  const deltaLambda = toRadians(deltaLon);

  const a =
    Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
    Math.cos(p1) *
      Math.cos(p2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);

  const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R;
  return Math.round(d);
}

export function diasFaltantes(fechaObjetivo) {
  // Obtiene la fecha actual con Moment.js
  const fechaActual = moment();

  // Calcula la diferencia en días entre la fecha actual y la fecha objetivo
  const diasFaltantes = fechaObjetivo.diff(fechaActual, "days");

  return diasFaltantes;
}
