import { Link } from "react-router-dom";

export const ClientCard = ({ client }) => {
    return (
      <Link to={`/client/${client.id}`}>
        <main className="grid grid-cols-1 gap-4 p-4 mb-3 rounded-md bg-gray-200 hover:bg-gray-300 cursor-pointer lg:grid-flow-col lg:grid-cols-6 lg:justify-items-center">
          <div className="lg:col-span-1">
            <span className="lg:hidden font-semibold">Nombre: </span>
            {client.first_name + " " + client.last_name}
          </div>
          <div className="lg:col-span-1">
            <span className="lg:hidden font-semibold">Email: </span>
            {client.email}
          </div>
          <div className="lg:col-span-1">
            <span className="md:hidden font-semibold">Teléfono: </span>
            {client.phone_number || "-"}
          </div>
          <div className="lg:col-span-1">
            <span className="lg:hidden font-semibold">Expedientes: </span>
            {client.expedientes ? client.expedientes.length : "0"}
          </div>
          <div className="lg:col-span-1">
            <span className="lg:hidden font-semibold">Deudas: </span>
            {client.deudas}€
          </div>
          <div className="lg:col-span-1">
            <span className="lg:hidden font-semibold">Pagos: </span>
            {client.pagos}€
          </div>
        </main>
      </Link>
    );
  };
  