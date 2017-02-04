import Header from 'components/Header'
import React from 'react'

import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

describe('Header', () => {
  it('should render a title and a trello link', () => {
    const header = shallow(<Header />)

    expect(toJSON(header)).toMatchSnapshot()
  })
})
