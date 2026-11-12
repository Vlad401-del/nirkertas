import { PublicLayout } from './components/PublicLayout'
import { OrganizerLayout } from './components/OrganizerLayout'
import { useHashPath } from './lib/router'
import { Landing } from './pages/Landing'
import { Events } from './pages/Events'
import { EventDetail } from './pages/EventDetail'
import { MyTicket } from './pages/MyTicket'
import { Certificates } from './pages/Certificates'
import { Dashboard } from './pages/organizer/Dashboard'
import { ManageEvents } from './pages/organizer/ManageEvents'
import { Participants } from './pages/organizer/Participants'
import { Scanner } from './pages/organizer/Scanner'
import { Impact } from './pages/organizer/Impact'

function organizerPage(path: string) {
  switch (path) {
    case '/panel/acara':
      return <ManageEvents />
    case '/panel/peserta':
      return <Participants />
    case '/panel/pindai':
      return <Scanner />
    case '/panel/dampak':
      return <Impact />
    default:
      return <Dashboard />
  }
}

function publicPage(path: string) {
  if (path.startsWith('/acara/')) return <EventDetail id={path.slice('/acara/'.length)} />
  switch (path) {
    case '/acara':
      return <Events />
    case '/tiket':
      return <MyTicket />
    case '/sertifikat':
      return <Certificates />
    default:
      return <Landing />
  }
}

export default function App() {
  const path = useHashPath()
  if (path.startsWith('/panel')) return <OrganizerLayout path={path}>{organizerPage(path)}</OrganizerLayout>
  return <PublicLayout path={path}>{publicPage(path)}</PublicLayout>
}
