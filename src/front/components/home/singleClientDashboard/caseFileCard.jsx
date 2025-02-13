export const CaseFileCard = ({ caseFile }) => {
  return (
    <div className="bg-white mt-5 rounded-lg p-4 w-64 h-64 shadow-md transition-transform hover:scale-105 cursor-pointer border border-gray-300">
      <h4 className="text-xl font-bold text-gray-800">{caseFile.numExp}</h4>

      <div className="mt-3 space-y-2">
        <div>
          <h6 className="text-sm font-semibold text-gray-600">NIG:</h6>
          <p className="text-md text-gray-900">{caseFile.nig}</p>
        </div>

        <div>
          <h6 className="text-sm font-semibold text-gray-600">Estado:</h6>
          <p
            className={`text-md font-medium px-2 py-1 rounded-full inline-block
        ${caseFile.status === "Abierto" ? "bg-green-100 text-green-800" : ""}
        ${
          caseFile.status === "En preparación"
            ? "bg-yellow-100 text-yellow-800"
            : ""
        }
        ${caseFile.status === "En trámite" ? "bg-blue-100 text-blue-800" : ""}
        ${
          caseFile.status === "Pendiente resolucion"
            ? "bg-orange-100 text-orange-800"
            : ""
        }
        ${
          caseFile.status === "Recurrido" ? "bg-purple-100 text-purple-800" : ""
        }
        ${
          caseFile.status === "Ejecutoria"
            ? "bg-indigo-100 text-indigo-800"
            : ""
        }
        ${caseFile.status === "Suspendido" ? "bg-gray-100 text-gray-800" : ""}
        ${
          caseFile.status === "Archivado provisionalmente"
            ? "bg-pink-100 text-pink-800"
            : ""
        }
        ${caseFile.status === "Cerrado" ? "bg-red-100 text-red-800" : ""}`}
          >
            {caseFile.status}
          </p>
        </div>

        <div>
          <h6 className="text-sm font-semibold text-gray-600">Juzgado:</h6>
          <p className="text-md text-gray-900">{caseFile.court}</p>
        </div>
      </div>
    </div>
  );
};
