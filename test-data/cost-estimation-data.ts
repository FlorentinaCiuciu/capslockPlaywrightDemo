import { WhyInterestedOptions, HomeownerOptions } from '../utils/enums'

export const validData = {
    zip: '56478',
    whyInterested: WhyInterestedOptions.THERAPY,
    homeowner: HomeownerOptions.MOBILE,
    name: 'Test Name',
    email: 'aa@bb.ccc',
    phone: '2345678901'
}

export const unavailableZip = '12345'

export const invalidZipCodes = [
    '5678',
    '987654',
    'asdfg',
    '5678a',
    '56 789'
    // TODO rest of validations
]