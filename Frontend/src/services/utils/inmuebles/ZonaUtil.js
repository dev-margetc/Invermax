import { convertirPrimeraMayuscula } from "../GeneralUtils";

export const formatZona = (zonas) => {
  return zonas.map((zona) => ({
    value: zona.idZona,
    label: convertirPrimeraMayuscula(zona.nombreZona),
    icon: zona.iconoZona
  }));
};