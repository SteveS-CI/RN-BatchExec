export default fr = {
  formats: {
    decimal: ',',
    thousands: '.'
  },
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
  button: {
    captions: {
      cancel: "Annuler",
      ok: "D'accord",
      yes: "Oui",
      no: "Non",
      previous: "Précédent",
      comments: "commentaires",
      confirm: "Confirmer",
      sign: "Signe",
      approve: "Approuver",
      details: "Détails",
      start: "Début",
      continue: "Continuer",
      save: "Conserver",
      select: "Choisir"
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
      language: "La langue",
      okCaption: "Conserver"
    },
    locations: {
      title: "Sélection de l'emplacement",
      okCaption: "Sélectionner"
    }
  },
  locations: {
    header: {
      name: "Prénom",
      code: "Code",
      status: "Statut"
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
    header: {
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
    BatchStatus: {
      NotReady: "Pas prêt",
      Ready: "Prêt",
      Started: "Commencé",
      InProcess: "En cours",
      PendingSignature: "Signature en attente",
      PendingApproval: "Validation en attente",
      Complete: "Achevée",
      Aborted: "Avorté"
    },
    Availability: {
      Unavailable: "Indisponible",
      Available: "Disponible",
      Assigned: "Attribué",
      InUse: "Utilisé"
    },
    CleanStatus: {
      NotApplicable: "N/A",
      Clean: "Nettoyer",
      DirtyEmpty: "Sale (vide)",
      Dirty: "Sale (non vide)"
    },
    Condition: {
      NotApplicable: "N/A",
      Unserviceable: "Inutilisable",
      Faulty: "Défectueux",
      UnderRepair: "En réparation",
      Functional: "Fonctionnel"
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
