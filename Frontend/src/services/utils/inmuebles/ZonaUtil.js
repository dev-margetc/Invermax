import { convertirPrimeraMayuscula } from "../GeneralUtils";

// Formatea una lista de zonas del backend al frontend
export const formatZona = (zonas) => {
  return zonas.map((zona) => ({
    value: zona.idZona,
    label: convertirPrimeraMayuscula(zona.nombreZona),
    icon: zona.iconoZona
  }));
};

// Formatea una lista de zonas y las distribuye en 2 listas, comunes y de interes

export const clasificarZonas = (zonas) => {
  // Filtrar zonas comunes e de interés
  const zonasComunes = zonas.filter(zona => zona.tipoZona == "zona común");
  const zonasDeInteres = zonas.filter(zona => zona.tipoZona == "zona de interés");

  // Formatear ambas listas de zonas
  const zonasComunesFormateadas = formatZona(zonasComunes);
  const zonasDeInteresFormateadas = formatZona(zonasDeInteres);

  // Devolver ambas listas
  return {
    comunes: zonasComunesFormateadas,
    deInteres: zonasDeInteresFormateadas
  };

};
