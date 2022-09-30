/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const createEmployeeRecord = (employee) => {
    const employeeObject = {
        firstName:employee[0],
        familyName:employee[1],
        title:employee[2],
        payPerHour:employee[3],
        timeInEvents:[],
        timeOutEvents: [],
    }
    return employeeObject
}

const createEmployeeRecords = employeeArray => {
    return employeeArray.map(employee => createEmployeeRecord(employee))
}

const createTimeInEvent = function(timeIn) {
    this.timeInEvents.push({
        type:"TimeIn",
        hour:parseInt(timeIn.slice(-4)),
        date:timeIn.slice(0,-5)
    })
    return this
}

const createTimeOutEvent = function(timeOut) {
    this.timeOutEvents.push({
        type:"TimeOut",
        hour:parseInt(timeOut.slice(-4)),
        date:timeOut.slice(0,-5)
    })
    return this

}

const hoursWorkedOnDate = function(date) {
    const clockedIn = this.timeInEvents.find(timeInObject => timeInObject.date === date).hour
    const clockedOut = this.timeOutEvents.find(timeOutObject => timeOutObject.date === date).hour
    return Math.round((clockedOut - clockedIn)/100)

}

const wagesEarnedOnDate = function(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour

}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = (employeeArray, firstName) => {
    return employeeArray.find(employeeObject => employeeObject.firstName === firstName)
}

const calculatePayroll = employeeArray => {
    return employeeArray.reduce((runningTotal, employeeObject) => {
        return allWagesFor.call(employeeObject) + runningTotal
    },0)
}

let employeeRecords = createEmployeeRecords(csvDataEmployees)
console.log(calculatePayroll(employeeRecords))