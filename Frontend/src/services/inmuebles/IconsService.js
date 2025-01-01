import CameraIcon from '../../assets/icons/camera.svg';
import VideoIcon from '../../assets/icons/video.svg';
import MapIcon from '../../assets/icons/map.svg';
import VrIcon from '../../assets/icons/vr.svg';
import ExpandIcon from '../../assets/icons/expand.svg';
import ParqueaderoIcon from '../../assets/icons/parqueadero.svg';
import RecepcionIcon from '../../assets/icons/recepcion.svg';
import LavadoIcon from '../../assets/icons/lavado.svg';
import GimnasioIcon from '../../assets/icons/gimnasio.svg';
import SalonSocialIcon from '../../assets/icons/salon_social.svg';
import ZonaNinosIcon from '../../assets/icons/zona_ninos.svg';
import EspacioComunalIcon from '../../assets/icons/espacio_comunal.svg';
import ElevadorIcon from '../../assets/icons/elevador.svg';
import ZonasVerdesIcon from '../../assets/icons/zonas_verdes.svg';
import VigilanciaIcon from '../../assets/icons/vigilancia.svg';
import BanoIcon from '../../assets/icons/bano.svg';
import CarroIcon from '../../assets/icons/carro.svg';
import AreaIcon from '../../assets/icons/area.svg';
import CamaIcon from '../../assets/icons/cama.svg';
import TransportePublicoIcon from '../../assets/icons/transporte_publico.svg';
import GimnasiosIcon from '../../assets/icons/gimnasios.svg';
import HospitalesIcon from '../../assets/icons/hospitales.svg';
import CentrosComercialesIcon from '../../assets/icons/centros_comerciales.svg';
import SupermercadosIcon from '../../assets/icons/supermercados.svg';
import TiendasBarrioIcon from '../../assets/icons/tiendas_barrio.svg';
import ParquesIcon from '../../assets/icons/parques.svg';
import JardinesColegiosIcon from '../../assets/icons/jardines_colegios.svg';

const iconMapping = {
    CameraIcon,
    VideoIcon,
    MapIcon,
    VrIcon,
    ExpandIcon,
    ParqueaderoIcon,
    RecepcionIcon,
    LavadoIcon,
    GimnasioIcon,
    SalonSocialIcon,
    ZonaNinosIcon,
    EspacioComunalIcon,
    ElevadorIcon,
    ZonasVerdesIcon,
    VigilanciaIcon,
    BanoIcon,
    CarroIcon,
    AreaIcon,
    CamaIcon,
    TransportePublicoIcon,
    GimnasiosIcon,
    HospitalesIcon,
    CentrosComercialesIcon,
    SupermercadosIcon,
    TiendasBarrioIcon,
    ParquesIcon,
    JardinesColegiosIcon
};

// Traer icono por nombre
export const getIconByName = (iconName) => {
    return iconMapping[iconName] || null; // Devuelve el icono si existe
};
