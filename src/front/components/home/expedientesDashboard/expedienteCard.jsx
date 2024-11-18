export const ExpedienteCard = ({ expediente }) => {
  return (
    <main className="grid grid-flow-col grid-cols-6 mx-3 mb-3 py-2.5 justify-items-center rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">
        <div className="">
            {expediente?.numExp}
        </div>
        <div className="">
            {expediente?.nig ? expediente?.nig : "-"}
        </div>
        <div className="">
            {expediente?.court ? expediente?.court : "-"}
        </div>
        <div className="">
            {expediente?.debts > 0 ? expediente?.debts : "-"}
        </div>
        <div className="">
            {new Date(expediente?.creationDate).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            })}
        </div>
        <div className="">
            {expediente?.status}
        </div>
    </main>
  );
};
