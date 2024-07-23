import { Button } from '@/components/ui/button'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='container mb-20 flex flex-col justify-center items-center gap-10'>
      <h2 className=' font-bold text-7xl'>404 Pas trouvé</h2>
      <p>Votre page visitée est introuvable. Vous pouvez accéder à la page d'accueil.</p>
      <Link href="/"><Button className='bg-main-orange text-white'>Retour à la page d'accueil</Button></Link>
    </div>
  )
}