import React, { Component } from 'react'
import moment from 'moment'
import Staffing from './Staffing'

moment.locale('fr', {
    week: {
        dow: 1
    }
});

const theodoers = [
    {
        id: 1,
        username: "jonathanb",
        standards: {
            projects: 1
        }
    },
    {
        id: 2,
        username: "maximet",
        standards: {
            projects: 1
        }
    },
    {
        id: 3,
        username: "stanislasb",
        standards: {
            projects: 2
        }
    },
    {
        id: 4,
        username: "clementrp",
        standards: {
            projects: 2
        }
    },
    {
        id: 5,
        username: "matthieua",
        standards: {
            projects: 2
        }
    }
];

const timeline = [
    { 
        id: 1,
        userId: 1,
        project: null,
        client: null,
        leave: true,
        startDate: "31/07/2017",
        endDate: "15/08/2017"
    },
    {
        id: 9,
        userId: 2,
        project: "Echoline",
        client: "Echoline",
        leave: false,
        startDate: "15/05/2017",
        endDate: "11/08/2017"
    },
    {
        id: 2,
        userId: 1,
        project: "Ask'IT",
        client: "BNP ITG - Boost IT",
        leave: false,
        startDate: "16/08/2017",
        endDate: "01/09/2017"
    },
    {
        id: 3,
        userId: 2,
        project: "Allomatch",
        client: "Allomatch",
        leave: false,
        startDate: "18/09/2017",
        endDate: "23/10/2017"
    },
    {
        id: 4,
        userId: 2,
        project: "WEFA",
        client: "Safran",
        leave: false,
        startDate: "25/09/2017",
        endDate: "16/10/2017"
    },
    {
        id: 5,
        userId: 2,
        project: "B2B",
        client: "Fundshop",
        leave: false,
        startDate: "09/10/2017",
        endDate: "30/10/2017"
    },
    {
        id: 6,
        userId: 3,
        project: "Projet Confidentiel",
        client: "SG - ITIM",
        leave: false,
        startDate: "07/08/2017",
        endDate: "30/10/2017"
    },
    {
        id: 7,
        userId: 3,
        project: "Projet Confidentiel #2",
        client: "SG - ITIM",
        leave: false,
        startDate: "07/08/2017",
        endDate: "30/10/2017"
    },
    {
        id: 8,
        userId: 4,
        project: "Fast IT - Filgood",
        client: "Fast IT",
        leave: false,
        startDate: "07/08/2017",
        endDate: "30/10/2017"
    },
    {
        id: 10,
        userId: 5,
        project: "Robo Mroning Star",
        client: "BNP AM",
        leave: false,
        startDate: "07/08/2017",
        endDate: "30/10/2017"
    },
    {
        id: 11,
        userId: 5,
        project: "Gouvernance",
        client: "BNP AM",
        leave: false,
        startDate: "07/08/2017",
        endDate: "30/10/2017"
    }
]

const weeks = [];
for (let i = -4; i <= 16; i++) {
    if (i < 0) {
        weeks.push(moment().subtract(i * -1, 'w').startOf('week'));
    } else {
        weeks.push(moment().add(i, 'w').startOf('week'));
    }
}

export default class App extends Component {
    render() {
        return <Staffing users={theodoers} timeline={timeline} weeks={weeks} />
    }
}