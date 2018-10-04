
var mocked = false

export default {
  setMocked: (value) => { mocked = value },
  getMocked: () => { return mocked }
}
