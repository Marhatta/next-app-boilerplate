import Link from 'next/link'
import Dummy from '../components/Dummy'

export default function Home() {
  return (
    <div>
     <h1>This is the index page</h1>
     <Dummy />
     <Link href='/newPage'>Go to new page</Link>
    </div>
  )
}
