export const ExpedienteCard = ({ expediente }) => {
  return (
    <main className="grid grid-flow-col grid-cols-6 mx-3 mb-3 py-2.5 justify-items-center rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer">
        <div className="">
            {expediente?.num_exp}
        </div>
        <div className="">
            {expediente?.nig ? expediente?.nig : "-"}
        </div>
        <div className="">
            {expediente?.juzgado ? expediente?.juzgado : "-"}
        </div>
        <div className="">
            {expediente?.deudas > 0 ? expediente?.deudas : "-"}
        </div>
        <div className="">
            {new Date(expediente?.creation_date).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            })}
        </div>
        <div className="">
            {expediente?.estado}
        </div>
    </main>
  );
};
