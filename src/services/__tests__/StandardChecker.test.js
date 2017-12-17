import Checker from '../StandardChecker'
import moment from 'moment'

describe('StandardChecker test suite', () => {
    it('should validate the number of project for a day is below the standard', () => {
        const tasks = [
            { 
                id: 1,
                userId: 1,
                project: null,
                client: null,
                leave: true,
                startDate: "2017-08-14",
                endDate: "2017-08-15"
            }
        ]

        const standards = {
            projects: 1
        }

        expect(Checker.isValid(moment('2017-08-14'), standards, tasks)).toBeTruthy()
        expect(Checker.isValid(moment('2017-08-15'), standards, tasks)).toBeTruthy()
    })
})