export default es = {
  languages: {
    english: "Inglés",
    french: "Francés",
    spanish: "Español"
  },
  menus: {
    dropdown: {
      changeLocation: "Cambiar locación",
      settings: "Ajustes",
      login: "Iniciar sesión",
      logout: "Cerrar sesión",
      exit: "Salida",
      about: "Acerca de",
      developer: "Herramientas de desarrollo"
    }
  },
  buttons: {
    caption: {
      cancel: "Cancelar",
      ok: "De acuerdo",
      yes: "Sí",
      no: "No",
      previous: "Anterior",
      comments: "Comentarios",
      confirm: "Confirmar",
      sign: "Firmar",
      approve: "Aprobar",
      details: "Detalles",
      start: "Comienzo",
      continue: "Continuar"
    }
  },
  screens: {
    main: {
      title: "Ejecución por lotes"
    },
    batchList: {
      title: "Selección de lotes"
    },
    batchDetail: {
      title: "Detalles del lote",
      properties: "Propiedades",
      components: "Componentes",
      equipment: "Equipo"
    },
    settings: {
      title: "Ajustes",
      api: "Dirección API",
      theme: "Usar tema oscuro",
      themeDescription: "Muestra fondos más oscuros con texto claro.",
      language: "Idioma",
      okCaption: "Guardar"
    },
    locations: {
      title: "Selección de ubicación",
      okCaption: "Seleccionar"
    }
  },
  locations: {
    header: {
      name: "Nombre",
      code: "Código",
      status: "Estado"
    }
  },
  batchList: {
    header: {
      product: "Producto",
      batchCode: "Codigo de lote",
      quantity: "Cantidad",
      status: "Estado"
    }
  },
  properties: {
    batch: {
      id: "ID del lote",
      code: "Código de lote",
      productCode: "Código de producto",
      productName: "nombre del producto",
      productionDate: "Fecha de producción",
      quantity: "Cantidad",
      status: "Estado",
      startErrors: "Errores de inicio"
    }
  },
  enums: {
    BatchStatus: {
      NotReady: "No está listo",
      Ready: "Listo",
      Started: "Empezado",
      InProcess: "En proceso",
      PendingSignature: "Firma pendiente",
      PendingApproval: "Aprobación pendiente",
      Complete: "Completar",
      Aborted: "Abortado"
    },
    Availability: {
      Unavailable: "Indisponible",
      Available: "Disponible",
      Assigned: "Asignado",
      InUse: "En uso"
    },
    CleanStatus: {
      NotApplicable: "N/A",
      Clean: "Limpiar",
      DirtyEmpty: "Sucio (vacio)",
      Dirty: "Sucio (no vacío)"
    },
    Condition: {
      NotApplicable: "N/A",
      Unserviceable: "Inservible",
      Faulty: "Defectuoso",
      UnderRepair: "Bajo reparación",
      Functional: "Funcional"
    }
  },
  startErrors: {
    0: "Otro lote (etapa) ya está en progreso en esta ubicación.",
    1: "No se puede continuar el lote hasta que se hayan completado las etapas dependientes.",
    2: "Equipo requerido no presente.",
    3: "Equipo sucio (producto incompatible).",
    4: "El equipo es inservible.",
    5: "La ubicación no está disponible.",
    6: "La ubicación está sucia.",
    7: "La ubicación está fuera de servicio.",
    8: "Los componentes no han sido dispensados."
  }
}
