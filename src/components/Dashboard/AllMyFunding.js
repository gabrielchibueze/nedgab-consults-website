import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { authHeader } from '../../services/BaseService';
import CurrencyFormat from "react-currency-format";
import BASE_URL from '../../services/Constant';
import { motion } from "framer-motion";


const AllMyFunding = () => {
    const [funding, setFunding] = useState([]);

    const currentUser = useSelector((state) => state.user);
    
     useEffect(() => {
       axios
         .get(`${BASE_URL}/funding/${currentUser.id}`, {
           headers: authHeader(),
         })
           .then((resp) => {
               console.log(resp);
               setFunding(resp.data);
         })
         .catch((error) => {
           console.log(error);
         });
       // eslint-disable-next-line
     }, []);

    return (
      <div>
        {funding.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1000 } }}
            className="card mt-4"
          >
            <div className="card-header d-flex justify-content-between p-4">
              <div className="col-6">
                <h3>All Funding Applied For</h3>
              </div>
            </div>

            <div className="card-body">
              <table className="table table-striped col-md:table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Currency</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Reason</th>
                    {/* <th scope="col">Ations</th> */}
                  </tr>
                </thead>
                <tbody>
                  {funding.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.firstName + " " + item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.currency}</td>
                      <td>
                        <CurrencyFormat
                          renderText={(value) => <b>{value}</b>}
                          decimalScale={2}
                          value={item.amount}
                          displayType={"text"}
                          thousandSeparator={true}
                        />
                      </td>
                      <td>{item.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <div className="container applicationZero">
            <h2>You don't have any fund Application yet</h2>
          </div>
        )}
      </div>
    );
}

export default AllMyFunding