export const en = {
  languages: {
    english: "English",
    french: "French",
    spanish: "Spanish"
  },
  menus: {
    dropdown: {
      changeLocation: "Change Location",
      settings: "Settings",
      login: "Log In",
      logout: "Log Out",
      exit: "Exit",
      about: "About",
      developer: "Developer Tools"
    }
  },
  buttons: {
    caption: {
      cancel: "Cancel",
      ok: "OK",
      yes: "Yes",
      no: "No",
      previous: "Previous",
      comments: "Comments",
      confirm: "Confirm",
      sign: "Sign",
      approve: "Approve",
      details: "Details",
      start: "Start",
      continue: "Continue"
    }
  },
  screens: {
    main: {
      title: "Batch Execution"
    },
    batchList: {
      title: "Batch Selection"
    },
    batchDetail: {
      title: "Batch Details",
      properties: "",
      components: "",
      equipment: ""
    },
    settings: {
      title: "Settings",
      api: "API Address",
      theme: "Use dark theme",
      themeDescription: "Show darker backgrounds with light text",
      language: "Language"
    }
  },
  batchList: {
    header: {
      product: "Product",
      batchCode: "Batch Code",
      quantity: "Quantity",
      status: "Status"
    }
  },
  properties: {
    batch: {
      id: "Batch ID",
      code: "Batch Code",
      productCode: "Product Code",
      productName: "Product Name",
      productionDate: "Production Date",
      quantity: "Quantity",
      status: "Status",
      startErrors: "Start Errors"
    }
  },
  enums: {
    batchStatus: {
      NotReady: "Not Ready",
      Ready: "Ready",
      Started: "Started",
      InProcess: "In Process",
      PendingSignature: "Pending Signature",
      PendingApproval: "Pending Approval",
      Complete: "Complete",
      Aborted: "Aborted"
    }
  },
  startErrors: {
    0: "Another batch (stage) is already in progress at this location.",
    1: "Cannot continue batch until dependent stage(s) have completed.",
    2: "Required equipment not present.",
    3: "Equipment dirty (incompatible product).",
    4: "Equipment is unserviceable.",
    5: "Location is unavailable.",
    6: "Location is dirty.",
    7: "Location is out of order.",
    8: "Components have not been dispensed."
  }
}

export const fr = {
  languages: {
    english: "Anglais",
    french: "Français",
    spanish: "Espanol"
  },
  menus: {
    dropdown: {
      changeLocation: "Changer de lieu",
      settings: "Réglages",
      login: "Se connecter",
      logout: "Se déconnecter",
      exit: "Sortie",
      about: "Sur",
      developer: "Outils de développement"
    }
  },
  buttons: {
    caption: {
      cancel: "Annuler",
      ok: "Oui",
      yes: "Yes",
      no: "Non",
      previous: "Précédent",
      comments: "commentaires",
      confirm: "Confirmer",
      sign: "Signe",
      approve: "Approuver",
      details: "Détails",
      start: "Début",
      continue: "Continuer"
    }
  },
  screens: {
    main: {
      title: "Exécution par lots"
    },
    batchList: {
      title: "Sélection de lot"
    },
    batchDetail: {
      title: "Détails du lot",
      properties: "Propriétés",
      components: "Composants",
      equipment: "Équipement"
    },
    settings: {
      title: "Réglages",
      api: "Adresse API",
      theme: "Utilisez le thème sombre",
      themeDescription: "Afficher les arrière-plans plus sombres avec du texte clair",
      language: "La langue"
    }
  },
  batchList: {
    header: {
      product: "Produit",
      batchCode: "Code du lot",
      quantity: "Quantité",
      status: "Statut"
    }
  },
  properties: {
    batch: {
      id: "ID de lot",
      code: "Code du lot",
      productCode: "Code produit",
      productName: "Nom du produit",
      productionDate: "Date de production",
      quantity: "Quantité",
      status: "Statut",
      startErrors: "Erreurs de démarrage"
    }
  },
  enums: {
    batchStatus: {
      NotReady: "Pas prêt",
      Ready: "Prêt",
      Started: "Commencé",
      InProcess: "En cours",
      PendingSignature: "Signature en attente",
      PendingApproval: "Validation en attente",
      Complete: "Achevée",
      Aborted: "Avorté"
    }
  },
  startErrors: {
    0: "Un autre lot (étape) est déjà en cours à cet endroit.",
    1: "Impossible de continuer le lot tant que les étapes dépendantes ne sont pas terminées.",
    2: "L'équipement requis n'est pas présent.",
    3: "Équipement sale (produit incompatible).",
    4: "L'équipement est inutilisable.",
    5: "L'emplacement est indisponible.",
    6: "L'emplacement est sale.",
    7: "L'emplacement est en panne.",
    8: "Les composants n'ont pas été distribués."
  }
}

export const es = {
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
      language: "Idioma"
    }
  },
  batchList: {
    header: {
      product: "Producto",
      batchCode: "Codigo de lote",
      quantity: "cantidad",
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
    batchStatus: {
      NotReady: "No está listo",
      Ready: "Listo",
      Started: "Empezado",
      InProcess: "En proceso",
      PendingSignature: "Firma pendiente",
      PendingApproval: "Aprobación pendiente",
      Complete: "Completar",
      Aborted: "Abortado"
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
