describe('TrueStatements', () => {
  it("True is true.", () => {
    expect(true).to.equal(true)
  })
  it("False is false", () => {
    expect(false).to.equal(false)
  })
  it("False is not true.", () => {
    expect(false).to.equal(!true)
  })
  it("True is not False.", () => {
    expect(true).to.equal(!false)
  })
  it("True does not equal False.", () => {
    expect(true).to.not.equal(false)
  })
  it("False does not equal True.", () => {
    expect(false).to.not.equal(true)
  })
})
