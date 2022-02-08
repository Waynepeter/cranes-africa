
const initOrganization = {
  loading: false,
  organization: {},
  error: null
}

const initSendContactMessage = {
  loading: false,
  sendContactMessage: {},
  error: null
}

const initSendSubscription = {
  loading: false,
  sendSubscription: {},
  error: null
}

const initFetchFAQCats = {
  loading: false,
  fetchFAQCats: [],
  error: null
}

const initFetchTeam = {
  loading: false,
  fetchTeam: [],
  error: null
}

export {
  initOrganization, initSendContactMessage, initSendSubscription, initFetchFAQCats,
  initFetchTeam
}