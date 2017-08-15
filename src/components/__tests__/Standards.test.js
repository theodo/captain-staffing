import React from 'react'
import { shallow, render } from 'enzyme'
import moment from 'moment'

import Standards from '../Standards'

describe('Standards test suites', () => {
    const user = {
        id: 1,
        username: "benjaming",
        standards: {
            projects: 1
        }
    }

    it('should render without throwing an error', () => {
        const standards = shallow(<Standards user={user} weeks={[]} weeklyTasksCount={{}} />)
        expect(standards.is('.standards')).toBe(true)
    })

    it('should render a grey line if there is no standard violation', () => {
        const weeks = [moment('14/08/2017', 'DD/MM/YYYY')]
        const weeklyTasksCount = {
            33: user.standards.projects
        }

        const standards = render(<Standards user={user} weeks={weeks} weeklyTasksCount={weeklyTasksCount} />)
        const weekStandard = standards.children().first()
        expect(weekStandard.html().match(/error/)).toBeFalsy()
    })
    
    it('should render a red line if there is a standard violation', () => {
        const weeks = [moment('14/08/2017', 'DD/MM/YYYY')]
        const weeklyTasksCount = {
            33: user.standards.projects + 1
        }

        const standards = render(<Standards user={user} weeks={weeks} weeklyTasksCount={weeklyTasksCount} />)
        const weekStandard = standards.children().first()
        expect(weekStandard.html().match(/error/)).toBeTruthy()
    })
})