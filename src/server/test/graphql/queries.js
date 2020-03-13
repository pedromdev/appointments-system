import { gql } from 'apollo-boost'

export const TEST_ME = gql`
    query TestMe {
        me {
            id
            name
            email
        }
    }
`

export const TEST_ME_AS_DOCTOR = gql`
    query TestMeAsDoctor {
        me {
            id
            doctor {
                id
                medical_speciality
            }
        }
    }
`

export const TEST_MY_SCHEDULES = gql`
    query TestMySchedules {
        me {
            id
            schedules {
                status
                note
                datetime
                procedure {
                    name
                    duration
                }
            }
        }
    }
`
