
export default class AlgoService {
    // static calculateInvestment() {
    //     throw new Error('Method not implemented.')
    // }
    
    static calculateInvestment = (totalYears: number, coinBalance: number, monthlyDCA: number, currentPrice: number, pricePrediction: number, costBase: number) => {

        let investment = {
            beginningBalance: {
                coins: coinBalance,
                dollars: coinBalance * currentPrice,
                baseCost: costBase
            },
            endingBalance: {
                coins: 0,
                dollars: 0,
                baseCost: 0
            },
            priceActionTracker: {
                fourYearCycle: [],
                remainingYears: []
            },
            investmentTracker: {
                fourYearCycle: [],
                remainingYears: []
            }
        }
    
        let remainder = totalYears % 4
        let fourYearChange = ((pricePrediction - currentPrice) / totalYears) * 4
        let price = currentPrice
        let balance = coinBalance
        let stakeRate = 0.05
    
        // calculate month-by-month price action with random volitility
        for (let i = 0; i < (totalYears - remainder) / 4; i++) {
            investment.priceActionTracker.fourYearCycle.push(this.getCycleChange(fourYearChange, price, 4))
            price += fourYearChange
            investment.investmentTracker.fourYearCycle.push(this.getInvestmentChange(investment.priceActionTracker.fourYearCycle[i], balance, stakeRate, monthlyDCA))
            balance = investment.investmentTracker.fourYearCycle[i][3][11].coins
        }
        for (let i = 0; i < remainder; i++) {
            let yearlyChange = (pricePrediction - currentPrice) / totalYears
            investment.priceActionTracker.remainingYears.push(this.getCycleChange(yearlyChange, price, 1))
            price += yearlyChange
        }
        investment.investmentTracker.remainingYears.push(this.getInvestmentChange(investment.priceActionTracker.remainingYears[0], balance, stakeRate, monthlyDCA))
        
        let lastBalance = investment.investmentTracker.remainingYears.length - 1
        balance = investment.investmentTracker.remainingYears[0][lastBalance][11].coins
        investment.endingBalance.coins = investment.investmentTracker.remainingYears[0][lastBalance][11].coins
        investment.endingBalance.dollars = investment.investmentTracker.remainingYears[0][lastBalance][11].dollars
        investment.endingBalance.baseCost = investment.beginningBalance.baseCost + (monthlyDCA * (totalYears * 12))
        return investment
    }
    
    static getInvestmentChange = (priceAction: number[], balance: number, stakeRate: number, DCA: number) => {
    
        let years = priceAction.length
        let result = []
    
        // calculate month-by-month investment change based on price action and DCA
        for (let i = 0; i < years; i++) {
            let monthlyBalance = []
            for (let j = 0; j < 12; j++) {
                let temp = {
                    coins: 0,
                    dollars: 0
                }
                for (let k = 0; k < 6; k++) {
                    balance += (balance * stakeRate) / 73
                }
                balance += (DCA / priceAction[i][j])
                temp.coins = balance
                temp.dollars = balance * priceAction[i][j]
                monthlyBalance.push(temp)
                // one more epoch because there are 73 in a year
                balance += (balance * stakeRate) / 73
            }
            result.push(monthlyBalance)
        }
        return result
    }
    
    static getCycleChange = (cycleChange: number, price: number, cycles: number) => {
        // let yearByYear = {
        //     yearOne: [],
        //     yearTwo: [],
        //     yearThree: [],
        //     yearFour: []
        // }
        let yearByYear = []
        let yearlyChange = cycleChange / cycles
        // let monthlyChange = cycleChange / (cycles * 12)
    
        for (let i = 0; i < cycles; i++) {
            // yearByYear[`${i + 1}`] = []
            let oneYear = []
            let newPrice = price
            let correction = yearlyChange / 2
    
            // months one through five
            for (let i = 1; i < 6; i++) {
                let min = newPrice - (newPrice * .1)
                let max = newPrice + (newPrice * .1)
                let random = Math.random() * (max - min) + min
                oneYear.push(random)
                newPrice = random
            }
            // 'manual' correction halfway through the year to ensure price stays on track with prediction
            newPrice = price + correction
            oneYear.push(newPrice)
            price = newPrice
            
            // months seven through eleven
            for (let i = 1; i < 6; i++) {
                let min = newPrice - (newPrice * .1)
                let max = newPrice + (newPrice * .1)
                let random = Math.random() * (max - min) + min
                oneYear.push(random)
                newPrice = random
            }
            // 'manual' correction at the end of the year to ensure price stays on track with prediction
            newPrice = price + correction
            oneYear.push(newPrice)
            price = newPrice
            yearByYear.push(oneYear)
        }
        return yearByYear
    }
}