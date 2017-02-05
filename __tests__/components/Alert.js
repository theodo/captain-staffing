import Alert from 'components/Alert'
import React from 'react'

import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'

describe('Alert', () => {
  it('should handle 403 error', () => {
    const error = { code: 403 }
    const alert = shallow(<Alert error={error} />)

    expect(toJSON(alert)).toMatchSnapshot()
  })

  it('should handle 404 error', () => {
    const error = { code: 404 }
    const alert = shallow(<Alert error={error} />)

    expect(toJSON(alert)).toMatchSnapshot()
  })

  it('should handle 400 error', () => {
    const error = { code: 400, message: 'error' }
    const alert = shallow(<Alert error={error} />)

    expect(toJSON(alert)).toMatchSnapshot()
  })

  it('should handle 503 error', () => {
    const error = { code: 503 }
    const alert = shallow(<Alert error={error} />)

    expect(toJSON(alert)).toMatchSnapshot()
  })

  it('should handle default error', () => {
    const error = { code: 0 }
    const alert = shallow(<Alert error={error} />)

    expect(toJSON(alert)).toMatchSnapshot()
  })
})
