export default en = {
  formats: {
    decimal: '.',
    thousands: ','
  },
  languages: {
    english: "English",
    french: "French",
    spanish: "Spanish"
  },
  menus: {
    dropdown: {
      batchList: "Batch List",
      changeLocation: "Change Location",
      settings: "Settings",
      login: "Log In",
      logout: "Log Out",
      exit: "Exit",
      about: "About",
      developer: "Developer Tools"
    }
  },
  button: {
    captions: {
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
      continue: "Continue",
      save: "Save",
      select: "Select",
      components: "Components"
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
      properties: "Properties",
      components: "Components",
      equipment: "Equipment"
    },
    settings: {
      title: "Settings",
      api: "API Address",
      theme: "Use dark theme",
      themeDescription: "Show darker backgrounds with light text",
      language: "Language"
    },
    locations: {
      title: "Location Selection"
    },
    nodeSelect: {
      title: "%{name} Selection",
      prompt: "Select one of the following %{name}"
    }
  },
  locations: {
    header: {
      name: "Name",
      code: "Code",
      status: "Status"
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
  nodeSelect: {
    header: {
      id: "ID",
      name: "%{name} Name",
      notes: "Notes"
    }
  },
  properties: {
    header: {
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
  components: {

  },
  equipment: {

  },
  enums: {
    BatchStatus: {
      NotReady: "Not Ready",
      Ready: "Ready",
      Started: "Started",
      InProcess: "In Process",
      PendingSignature: "Pending Signature",
      PendingApproval: "Pending Approval",
      Complete: "Complete",
      Aborted: "Aborted"
    },
    Availability: {
      Unavailable: "Unavailable",
      Available: "Available",
      Assigned: "Assigned",
      InUse: "In Use"
    },
    CleanStatus: {
      NotApplicable: "N/A",
      Clean: "Clean",
      DirtyEmpty: "Dirty (Empty)",
      Dirty: "Dirty (Full)"
    },
    Condition: {
      NotApplicable: "N/A",
      Unserviceable: "Unserviceable",
      Faulty: "Faulty",
      UnderRepair: "Under Repair",
      Functional: "Functional"
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
  },
  node: {
    names: {
      stage: {
        one: "Stage",
        other: "Stages"
      },
      operation: {
        one: "Operation",
        other: "Operations"
      },
      action: {
        one: "Action",
        other: "Actions"
      }
    }
  }
}
