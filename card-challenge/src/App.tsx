import bgMobile from "../public/images/bg-main-mobile.png";
import bgDesktop from "../public/images/bg-main-desktop.png";
import logo from "../public/images/card-logo.svg";
import ThankYou from "./ThankYou";
import { useState } from "react";
import { format } from "date-fns";


export default function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("01/23");
  const [cvc, setCvc] = useState("");

  const handleNameChange = (event:any) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^A-Za-z\s]/ig, ''); // Allow spaces as well
    setName(filteredValue);
  };

  return (
    <>
      <section className="container">
        <div className="absolute -z-10 w-full">
          <picture>
            <source media="(min-width: 768px)" srcSet={bgDesktop} />
            <img src={bgMobile} alt="" className="w-full md:w-1/3" />
          </picture>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:gap-x-32 lg:grid-cols-2 max-w-7xl mx-auto">
          <div className="mx-5 grid grid-cols-1">
            <article className="front-card p-5 flex flex-col justify-between lg:ml-20">
              <img src={logo} alt="" className="w-20 lg:w-28" />

              <div>
                <h2 className=" text-white text-xl lg:text-3xl mb-6 tracking-widest">
                  {cardNumber}
                </h2>

                <ul className="flex items-center justify-between">
                  <li className="text-white uppercase text-base lg:text-xl tracking-widest">
                    {name}
                  </li>
                  <li className="text-white text-base lg:text-xl tracking-widest">
                    {format(new Date(date), "MM/yy")}
                  </li>
                </ul>
              </div>
            </article>

            <article className="back-card relative lg:ml-40 lg:mt-10">
              <p className="absolute right-10 text-lg lg:text-xl text-white tracking-widest">
                {cvc}
              </p>
            </article>
          </div>

          <div className="pt-8 px-5 pb-20">
            {!confirmed && (
              <form className="flex flex-col justify-center gap-8 max-w-lg lg:h-screen">
                <div>
                  <label htmlFor="cardholder_name">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardholder_name"
                    id="cardholder_name"
                    placeholder="e.g. Jane Appleseed"
                    required
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>

                <div>
                  <label htmlFor="card_number">Card Number</label>
                  
                  <input
                    type="text"
                    name="card_number"
                    id="card_number"
                    placeholder="e.g. 1234 5678 9012 3456"
                    maxLength={19} 
                    required
                    className={`form input${cardNumber !== "" ? 'error' : ""}`}
                    value={cardNumber} 
                    onChange={(e) => {
                      const inputDigits = e.target.value.replace(/\D/g, "")
                      const formattedInput = inputDigits.replace(/(\d{4})/g, "$1 ").trim();
                      if (inputDigits.length <= 16) {
                        setCardNumber(formattedInput);
                      }
                    }}
                />

                {/* <p className="error">{cardNumber === "" ? "Wrong Format, numbers Only" : ""}</p> */}
                </div>

                <article className="flex items-center justify-between gap-8">
                  <div className="flex-1">
                    <label htmlFor="expiry_date">Exp. Date (MM/YY)</label>
                    <input
                      type="month"
                      name="expiry_date"
                      id="expiry_date"
                      placeholder="MM YY"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    
                  </div>

                  <div className="flex-1">
                    <label htmlFor="cvc">CVC</label>
                    <input
                      type="number"
                      name="cvc"
                      id="cvc"
                      placeholder="e.g. 123"
                      maxLength={3}
                      required
                      value={cvc}
                      onChange={(e) => {
                        const inputDigits = e.target.value.replace(/\D/g, "")

                        if(inputDigits.length<=3) {
                          setCvc(inputDigits);
                        }
                      }}
                    />
                  </div>
                </article>

                <button onClick={() => setConfirmed(true)} className="btn">
                  Confirm
                </button>
              </form>
            )}

            {confirmed && <ThankYou setConfirmed={setConfirmed} />}
          </div>
        </div>
      </section>
    </>
  );
}
