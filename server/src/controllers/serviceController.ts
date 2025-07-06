import { Request, Response } from 'express';

// import Service from '../models/service';


const getUserServices = (res: Response, req: Request) => {


const services = {test: "ssss"}
return res.status(200).json(services)

}

