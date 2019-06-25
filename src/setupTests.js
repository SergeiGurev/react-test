import * as Enzyme from 'enzyme'
import ReactSixteenAdapter from 'enzyme-adapter-react-16'

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new ReactSixteenAdapter() })

// Fail tests on any warning
console.error = message => {
  throw new Error(message)
}
