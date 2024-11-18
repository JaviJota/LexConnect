import { TrashIcon } from "@heroicons/react/24/outline";
import { useDeudasStore } from "../../../store/deudaDataStore.jsx";


export const PagoCard = (pago) => {
  // const deudaToPagoFunc = useDeudasStore((state) => state.deudaToPago);
  const pagoData = pago?.pago

  return (
    <>
      <div className="mx-4 flex justify-around border-l-4 border-green-700 bg-gray-200 rounded-md p-1 mb-3 hover:ml-6 hover:mr-2 transition-all">
      <div>
          <p className="font-semibold">Cantidad:</p>
          <p className="font-normal">{pagoData?.amount}€</p>
        </div>
        <div>
          <p className="font-semibold">Concepto:</p>
          <p className="font-normal">
            {pagoData?.title}
          </p>
        </div>
        <div>
          <p className="font-semibold">Expediente:</p>
          <p className="font-normal">{pagoData?.numExp}</p>
        </div>
        <div>
            <label className="font-semibold flex items-center" htmlFor="">
              Pasar a deuda
            </label>
            <input type="checkbox" />
        </div>
        <div className="self-center">
          <TrashIcon className="size-4 cursor-pointer"/>   
        </div>
      </div>
    </>
  );
};
