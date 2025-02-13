import { useState } from "react";

import { PlusIcon } from "@heroicons/react/24/outline";
import { AddDeuda } from "./addDeuda";


export const AddDeudaButton = () => {
    const [addDeudaModalOpen, setAddDeudaModalOpen] = useState(false);
    
    return(
        <>
            <button 
                className="
                    rounded-lg p-4 min-w-[250px] max-w-sm 
                    min-h-[250px] max-h-sm shadow-md transition-transform 
                    hover:scale-105 bg-slate-200 bg-opacity-65 flex justify-center items-center"
                onClick={() => setAddDeudaModalOpen(true)}
            >
            <div className="flex flex-col items-center h-auto">
                <h4 className="text-lg font-bold text-center text-slate-400">Crear deuda</h4>
                <PlusIcon className="size-28 text-slate-400" />
            </div>
        </button>
            <AddDeuda
                show={addDeudaModalOpen}
                close={() => setAddDeudaModalOpen(false)}
            />
        </>
    )
};

