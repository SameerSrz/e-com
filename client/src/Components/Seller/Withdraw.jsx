import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllSellerOrders } from '../../redux/action/order'
import styles from '../../Styles/styles'
import axios from 'axios'
import { toast } from 'react-toastify'
import { server } from '../../server'
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineDelete } from 'react-icons/ai'
import { loadSeller } from '../../redux/action/user'

const Withdraw = () => {
    const dispatch = useDispatch()
    const {seller} = useSelector((state)=>state.seller)
    // const {orders} = useSelector((state)=>state.orders)
    // const [deliveredOrder,setDeliverdOrder] = useState()
    const [withdrawAmount, setWithdrawAmount] = useState(50);
    const [paymentMethod,setPaymentMethod] = useState("")
    const [bankInfo,setBankInfo] = useState({
      bankName:"",
      bankCountry:"",
      bankSwiftCode: null,
      bankAccountNumber: null,
      bankHolderName: "",
      bankAddress: "",
    })
    const [open,setOpen] = useState(false);

    useEffect(()=>{
        dispatch(getAllSellerOrders(seller._id))
        // const orderData = orders && orders.filter((item)=> item.status === "Deliverd");
        // setDeliverdOrder(orderData)
    })

    const deleteHandler = async()=>{
      // axios.delete
      axios.put(`${server}/shop/remove-payment-method/${seller._id}`).then((res)=>{
        toast.success(res.data.message)
        window.location.reload();
      }).catch((err)=>{
        toast.error(err);
      })
    }

    const handleSubmit = async(e)=>{
      e.preventDefault();

      const withdrawMethod = {
        bankName: bankInfo.bankName,
        bankCountry: bankInfo.bankCountry,
        bankSwiftCode: bankInfo.bankSwiftCode,
        bankAccountNumber: bankInfo.bankAccountNumber,
        bankHolderName: bankInfo.bankHolderName,
        bankAddress: bankInfo.bankAddress,
      }

      setPaymentMethod(false);
      await axios.put(`${server}/shop/update-payment-methods`,{withdrawMethod},{withCredentials: true}).then((res)=>{
        dispatch(loadSeller());
        toast.success("Withdraw method added successfully!");
        setBankInfo({
          bankName: res.data.withdraw.bankName,
          bankCountry: res.data.withdraw.bankCountry,
          bankSwiftCode: res.data.withdraw.bankSwiftCode,
          bankAccountNumber: res.data.withdraw.bankAccountNumber,
          bankHolderName: res.data.withdraw.bankHolderName,
          bankAddress: res.data.withdraw.bankAddress,
        })
      }).catch((err)=>{
        console.log(err);
      })

    }

    const withdrawHandler = async () => {
        if (withdrawAmount < 50 || withdrawAmount > availableBalance) {
          toast.error("You can't withdraw this amount!");
        } else {
          const amount = withdrawAmount;
          await axios
            .post(
              `${server}/withdraw/create-withdraw-request`,
              { amount },
              { withCredentials: true }
            )
            .then((res) => {
              toast.success("Withdraw money request is successful!");
              setOpen(false)
            });
        }
      };

      const error = () => {
        toast.error("You not have enough balance to withdraw!");
      };

    // const availableBalance = deliveredOrder && deliveredOrder.reduce((acc,item)=> acc + item.totalPrice, 0)
    // console.log(availableBalance)
    const availableBalance = seller && seller?.availableBalance?.toFixed(2);
  return (
    <>
        <div className="w-full h-[90vh] p-8">
      <div className="w-full bg-white h-full rounded flex items-center justify-center flex-col">
        <h5 className="text-[20px] pb-4">
          Available Balance: ${availableBalance}
        </h5>
        <div
          className={`${styles.button} text-white !h-[42px] !rounded`}
          onClick={() => (availableBalance < 50 ? error() : setOpen(true))}
        >
          Withdraw
        </div>
      </div>
      {open && (
        <div className="w-full h-screen z-[9999] !fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]">
          <div
            className={`w-[95%] 800px:w-[50%] bg-white shadow rounded ${
              paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"
            } min-h-[40vh] p-3`}
          >
            <div className="w-full flex justify-end">
              <RxCross1
                size={25}
                onClick={() => setOpen(false) || setPaymentMethod(false)}
                className="cursor-pointer"
              />
            </div>
            {paymentMethod ? (
              <div>
                <h3 className="text-[22px] font-Poppins text-center font-semibold">
                  Add new Withdraw Method:
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className='mb-2'>
                    <label>
                      Bank Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      value={bankInfo.bankName}
                      onChange={(e) =>
                        setBankInfo({ ...bankInfo, bankName: e.target.value })
                      }
                      id=""
                      placeholder="Enter your Bank name!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-2">
                    <label>
                      Bank Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      value={bankInfo.bankCountry}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankCountry: e.target.value,
                        })
                      }
                      id=""
                      required
                      placeholder="Enter your bank Country!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-4">
                    <label>
                      Bank Swift Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      id=""
                      required
                      value={bankInfo.bankSwiftCode}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankSwiftCode: e.target.value,
                        })
                      }
                      placeholder="Enter your Bank Swift Code!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-4">
                    <label>
                      Bank Account Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name=""
                      id=""
                      value={bankInfo.bankAccountNumber}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAccountNumber: e.target.value,
                        })
                      }
                      required
                      placeholder="Enter your bank account number!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>
                  <div className="pt-4">
                    <label>
                      Bank Holder Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      value={bankInfo.bankHolderName}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankHolderName: e.target.value,
                        })
                      }
                      id=""
                      placeholder="Enter your bank Holder name!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <div className="pt-4">
                    <label>
                      Bank Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name=""
                      required
                      id=""
                      value={bankInfo.bankAddress}
                      onChange={(e) =>
                        setBankInfo({
                          ...bankInfo,
                          bankAddress: e.target.value,
                        })
                      }
                      placeholder="Enter your bank address!"
                      className={`${styles.input} mt-2`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${styles.button} bg-[#fa7e19] mb-3 text-white`}
                  >
                    Add
                  </button>
                </form>
              </div>
            ) : (
              <>
                <h3 className="text-[22px] font-Poppins font-semibold mb-8 text-center">
                  Available Withdraw Methods
                </h3>

                {seller && seller?.withdrawMethod ? (
                  <div>
                    <div className="800px:flex w-full justify-between items-center">
                      <div className="800px:w-[50%] ml-[130px]">
                        <h5>
                          <span className='font-semibold font-Poppins '> Account Number: </span>{" "}
                          {"*".repeat(
                            seller?.withdrawMethod.bankAccountNumber.length - 3
                          ) +
                            seller?.withdrawMethod.bankAccountNumber.slice(-3)}
                        </h5>
                        <h5 className='mr-11 mt-4'> <span className='font-semibold font-Poppins '>Bank Name: </span>{seller?.withdrawMethod.bankName}</h5>
                      </div>
                      <div className="800px:w-[50%]">
                        <AiOutlineDelete
                          size={25}
                          className="cursor-pointer "
                          onClick={() => deleteHandler()}
                        />
                      </div>
                    </div>
                    <br />
                    <h4 className='ml-[130px]'> <span className='font-semibold font-Poppins '>Available Balance:</span> {availableBalance}$</h4>
                    <br />
                    <div className="800px:flex w-full items-center justify-center">
                      <input
                        type="number"
                        placeholder="Amount..."
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="800px:w-[100px] w-[full] border 800px:mr-3 p-1 rounded"
                      />
                      <div
                        className={`${styles.button} bg-[#fa7e19] !h-[42px] text-white`}
                        onClick={withdrawHandler}
                      >
                        Withdraw
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-[18px] pt-2 font-Poppins font-semibold ">
                      No Withdraw Methods available!
                    </p>
                    <div className="w-full flex items-center">
                      <div
                        className={`${styles.button} bg-[#fa7e19] text-[#fff] text-[18px] mt-4`}
                        onClick={() => setPaymentMethod(true)}
                      >
                        Add new
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default Withdraw
