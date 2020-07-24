import Link from 'next/link'

export default function NewPage(){
    return (
        <div>
        <h1>this is a new page</h1>
        <Link href='/'>Go to home</Link>
        </div>
    );
}