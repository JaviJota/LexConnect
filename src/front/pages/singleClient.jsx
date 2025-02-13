import { Sidebar, SidebarItem } from "../components/home/sidebar";
import {
    CalculatorIcon,
    EnvelopeIcon,
    FolderIcon,
    UsersIcon,
  } from "@heroicons/react/24/outline";
import { SingleClientDashboard } from "../components/home/singleClientDashboard/singleClientDashboard";


export const SingleClient = () => {
    const url = window.location.pathname.slice(1)

    return(
        <main>
        <div className="flex flex-1 ">
          <Sidebar>
            <SidebarItem
              icon={<UsersIcon className="size-5" />}
              text="Clientes"
              active={url === 'Clientes'}
            />
            <SidebarItem
              icon={<EnvelopeIcon className="size-5" />}
              text="Notificaciones"
              active={url === 'Notificaciones'}
            />
            <SidebarItem
              icon={<FolderIcon className="size-5" />}
              text="Expedientes"
              active={url === 'Expedientes'}
  
            />
            <SidebarItem
              icon={<CalculatorIcon className="size-5" />}
              text="Balance"
              active={url === 'Balance'}
            />
          </Sidebar>
          
          <section className="flex-1 overflow-auto">
            <SingleClientDashboard />
          </section>
        </div>
      </main>
    )
}