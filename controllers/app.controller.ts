import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

import AlgoService from '../services/AlgoService';

const calculate = async (req: Request, res: Response, next: NextFunction) => {
    const { totalYears, coinBalance, monthlyDCA, currentPrice, pricePrediction, costBase } = req.body;

    let result = await AlgoService.calculateInvestment(totalYears, coinBalance, monthlyDCA, currentPrice, pricePrediction, costBase);
    let { beginningBalance, endingBalance, priceActionTracker, investmentTracker } = result
    
    return res.status(200).json({ result: result })
}

export default { calculate };